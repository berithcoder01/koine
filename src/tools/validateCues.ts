/**
 * validateCues.ts
 *
 * Valida um arquivo cues.json gerado pelo pipeline Python de narração.
 * Uso: npx tsx src/tools/validateCues.ts public/audio/C1-M01/C1-M01.cues.json
 */

import * as fs from 'fs';
import * as path from 'path';

interface Cue {
  id: string;
  marker: string;
  text?: string;
  startTime: number;
  endTime: number;
}

interface Group {
  id: string;
  unitId?: string;
  unitType?: string;
  lessonPhase: string;
  cueIds: string[];
  canSkip?: boolean;
}

interface CuesData {
  version: string;
  moduleId: string;
  moduleTitle?: string;
  audioFile: string;
  duration: number;
  generatedAt?: string;
  narrationFile?: string;
  cues: Cue[];
  groups: Group[];
}

interface ValidationError {
  field: string;
  message: string;
}

function validate(cuesPath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  let data: CuesData;

  // 1. Arquivo existe e é JSON válido
  if (!fs.existsSync(cuesPath)) {
    errors.push({ field: 'file', message: `Arquivo não encontrado: ${cuesPath}` });
    return errors;
  }

  try {
    const raw = fs.readFileSync(cuesPath, 'utf-8');
    data = JSON.parse(raw);
  } catch (e) {
    errors.push({ field: 'file', message: `JSON inválido: ${e}` });
    return errors;
  }

  // 2. Campos da raiz
  if (data.version !== '1.0') {
    errors.push({ field: 'version', message: `Esperado "1.0", recebido "${data.version}"` });
  }

  if (!data.moduleId || typeof data.moduleId !== 'string') {
    errors.push({ field: 'moduleId', message: 'moduleId é obrigatório' });
  }

  if (!data.audioFile || typeof data.audioFile !== 'string') {
    errors.push({ field: 'audioFile', message: 'audioFile é obrigatório' });
  } else {
    const mp3Path = path.resolve(path.dirname(cuesPath), path.basename(data.audioFile));
    if (!fs.existsSync(mp3Path)) {
      errors.push({ field: 'audioFile', message: `MP3 não encontrado: ${mp3Path}` });
    }
  }

  if (typeof data.duration !== 'number' || data.duration <= 0) {
    errors.push({ field: 'duration', message: `duration deve ser > 0, recebido ${data.duration}` });
  }

  // 3. Cues
  if (!Array.isArray(data.cues) || data.cues.length === 0) {
    errors.push({ field: 'cues', message: 'cues deve ser um array não vazio' });
    return errors;
  }

  const cueIds = new Set<string>();

  for (let i = 0; i < data.cues.length; i++) {
    const cue = data.cues[i];

    if (!cue.id) {
      errors.push({ field: `cues[${i}]`, message: 'id é obrigatório' });
    } else if (cueIds.has(cue.id)) {
      errors.push({ field: `cues[${i}].id`, message: `id duplicado: "${cue.id}"` });
    } else {
      cueIds.add(cue.id);
    }

    if (typeof cue.startTime !== 'number' || cue.startTime < 0) {
      errors.push({ field: `cues[${i}].startTime`, message: `startTime inválido: ${cue.startTime}` });
    }

    if (typeof cue.endTime !== 'number' || cue.endTime <= cue.startTime) {
      errors.push({
        field: `cues[${i}].endTime`,
        message: `endTime (${cue.endTime}) deve ser > startTime (${cue.startTime})`,
      });
    }

    if (i > 0) {
      const prev = data.cues[i - 1];
      if (cue.startTime < prev.endTime) {
        errors.push({
          field: `cues[${i}]`,
          message: `Sobreposição: cue[${i}] startTime (${cue.startTime}) < cue[${i - 1}] endTime (${prev.endTime})`,
        });
      }
    }

    if (!cue.marker) {
      errors.push({ field: `cues[${i}].marker`, message: 'marker é obrigatório' });
    }
  }

  // 4. Groups
  if (!Array.isArray(data.groups) || data.groups.length === 0) {
    errors.push({ field: 'groups', message: 'groups deve ser um array não vazio' });
  } else {
    for (let i = 0; i < data.groups.length; i++) {
      const group = data.groups[i];

      if (!group.id) {
        errors.push({ field: `groups[${i}]`, message: 'id é obrigatório' });
      }

      if (!group.lessonPhase) {
        errors.push({ field: `groups[${i}].lessonPhase`, message: 'lessonPhase é obrigatório' });
      } else if (!['exposure', 'exercise'].includes(group.lessonPhase)) {
        errors.push({
          field: `groups[${i}].lessonPhase`,
          message: `lessonPhase deve ser "exposure" ou "exercise", recebido "${group.lessonPhase}"`,
        });
      }

      if (!Array.isArray(group.cueIds) || group.cueIds.length === 0) {
        errors.push({ field: `groups[${i}].cueIds`, message: 'cueIds deve ser um array não vazio' });
      } else {
        for (const cid of group.cueIds) {
          if (!cueIds.has(cid)) {
            errors.push({
              field: `groups[${i}].cueIds`,
              message: `cueId "${cid}" não encontrado em cues`,
            });
          }
        }
      }
    }
  }

  // 5. Duração total vs último cue
  if (data.cues.length > 0) {
    const lastCue = data.cues[data.cues.length - 1];
    const diff = Math.abs(data.duration - lastCue.endTime);
    if (diff > 2.0) {
      errors.push({
        field: 'duration',
        message: `duration (${data.duration}s) difere do último endTime (${lastCue.endTime}s) em ${diff.toFixed(1)}s`,
      });
    }
  }

  return errors;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Uso: npx tsx src/tools/validateCues.ts <cues.json path>');
    process.exit(1);
  }

  const cuesPath = path.resolve(args[0]);
  console.log(`🔍 Validando: ${cuesPath}`);
  console.log('');

  const errors = validate(cuesPath);

  if (errors.length === 0) {
    console.log('✅ cues.json válido!');
    process.exit(0);
  } else {
    console.log(`❌ ${errors.length} erro(s) encontrado(s):\n`);
    for (const err of errors) {
      console.log(`   [${err.field}] ${err.message}`);
    }
    process.exit(1);
  }
}

main();
