/**
 * generateAudioManifest.ts
 *
 * Lê todos os LearningUnits do currículo e gera um manifest.json
 * com cada text chunk que precisa de narração (card by card).
 *
 * Uso: npx tsx src/tools/generateAudioManifest.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { LEARNING_UNITS } from '../content/curriculum/units';

interface UnitRow {
  id: string;
  module_id: string;
  unit_order: number;
  unit_type: string;
  greek_form: string;
  transliteration: string;
  gloss_pt: string;
  phonetic_sound: string;
  explanation: string;
  mnemonic_hint: string;
  context_verse: string;
  context_reference: string;
  srs_key: string;
  phase2_data: string;
  phase3_data: string;
  phase4_data: string;
  phase5_data: string;
}

interface PhaseExercise {
  type: string;
  questionPT?: string;
  questionGreek?: string;
  correctAnswer: string | string[];
  options?: string[];
  explanation?: string;
}

interface AudioManifestEntry {
  moduleId: string;
  unitId: string;
  unitType: string;
  filename: string;
  path: string;
  text: string;
  type: 'exposure' | 'explanation' | 'mnemonic' | 'verse' | 'question' | 'answer';
  textLength: number;
  durationEstimate: number;
}

function parsePhase(data: string): PhaseExercise[] {
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildEntries(units: UnitRow[]): AudioManifestEntry[] {
  const entries: AudioManifestEntry[] = [];

  for (const unit of units) {
    const modId = unit.module_id;
    const unitId = unit.id;

    // 1. Exposure — greekForm + transliteration + glossPT + phoneticSound
    const exposureParts = [unit.greek_form, unit.transliteration, unit.gloss_pt].filter(Boolean);
    if (unit.phonetic_sound) exposureParts.push(`(${unit.phonetic_sound})`);
    const exposureText = exposureParts.join(' — ');
    entries.push({
      moduleId: modId,
      unitId,
      unitType: unit.unit_type,
      filename: 'exposure.mp3',
      path: `${modId}/${unitId}/exposure.mp3`,
      text: exposureText,
      type: 'exposure',
      textLength: exposureText.length,
      durationEstimate: Math.max(2, Math.round(exposureText.length / 15)),
    });

    // 2. Explanation (only if > 60 chars)
    const explanationText = unit.explanation?.trim();
    if (explanationText && explanationText.length > 60) {
      entries.push({
        moduleId: modId,
        unitId,
        unitType: unit.unit_type,
        filename: 'explanation.mp3',
        path: `${modId}/${unitId}/explanation.mp3`,
        text: explanationText,
        type: 'explanation',
        textLength: explanationText.length,
        durationEstimate: Math.max(2, Math.round(explanationText.length / 15)),
      });
    }

    // 3. Mnemonic hint (optional)
    const mnemonicText = unit.mnemonic_hint?.trim();
    if (mnemonicText) {
      entries.push({
        moduleId: modId,
        unitId,
        unitType: unit.unit_type,
        filename: 'mnemonic.mp3',
        path: `${modId}/${unitId}/mnemonic.mp3`,
        text: mnemonicText,
        type: 'mnemonic',
        textLength: mnemonicText.length,
        durationEstimate: Math.max(2, Math.round(mnemonicText.length / 15)),
      });
    }

    // 4. Context verse (optional)
    const verseText = unit.context_verse?.trim();
    if (verseText) {
      entries.push({
        moduleId: modId,
        unitId,
        unitType: unit.unit_type,
        filename: 'verse.mp3',
        path: `${modId}/${unitId}/verse.mp3`,
        text: `${verseText} — ${unit.context_reference ?? ''}`,
        type: 'verse',
        textLength: verseText.length + (unit.context_reference?.length ?? 0),
        durationEstimate: Math.max(2, Math.round((verseText.length + (unit.context_reference?.length ?? 0)) / 15)),
      });
    }

    // 5. Phase exercises (2-5)
    const phases = [
      { key: 'phase2_data', phase: 2 },
      { key: 'phase3_data', phase: 3 },
      { key: 'phase4_data', phase: 4 },
      { key: 'phase5_data', phase: 5 },
    ] as const;

    for (const phase of phases) {
      const exercises = parsePhase((unit as any)[phase.key]);

      for (let ei = 0; ei < exercises.length; ei++) {
        const ex = exercises[ei];

        // Question text (PT or Greek)
        const questionText = ex.questionGreek || ex.questionPT || '';
        if (questionText.trim()) {
          entries.push({
            moduleId: modId,
            unitId,
            unitType: unit.unit_type,
            filename: `p${phase.phase}_e${ei}_question.mp3`,
            path: `${modId}/${unitId}/p${phase.phase}_e${ei}_question.mp3`,
            text: questionText,
            type: 'question',
            textLength: questionText.length,
            durationEstimate: Math.max(2, Math.round(questionText.length / 15)),
          });
        }

        // Correct answer text
        const answerText = Array.isArray(ex.correctAnswer)
          ? ex.correctAnswer.join(', ')
          : ex.correctAnswer;
        if (answerText.trim()) {
          entries.push({
            moduleId: modId,
            unitId,
            unitType: unit.unit_type,
            filename: `p${phase.phase}_e${ei}_answer.mp3`,
            path: `${modId}/${unitId}/p${phase.phase}_e${ei}_answer.mp3`,
            text: answerText,
            type: 'answer',
            textLength: answerText.length,
            durationEstimate: Math.max(1, Math.round(answerText.length / 15)),
          });
        }
      }
    }
  }

  return entries;
}

function main() {
  const allUnits: UnitRow[] = [...LEARNING_UNITS];

  console.log(`📦 Lendo ${allUnits.length} unidades de aprendizado...`);

  const entries = buildEntries(allUnits);

  // Agrupar por módulo para o diretório
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicDir = path.resolve(__dirname, '../../public/audio');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const manifestPath = path.join(publicDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2), 'utf-8');

  // Summary
  const totalSize = entries.reduce((acc, e) => acc + e.durationEstimate * 8, 0); // 8 KB/s at 64kbps
  const uniqueUnits = new Set(entries.map(e => e.unitId)).size;
  const byType = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  console.log('');
  console.log('✅ Manifesto gerado!');
  console.log(`   📄 ${manifestPath}`);
  console.log(`   📊 ${entries.length} arquivos de áudio`);
  console.log(`   📦 ${uniqueUnits} unidades únicas`);
  console.log(`   📁 ${(totalSize / 1024).toFixed(0)} KB estimados (64kbps mono)`);
  console.log('');
  console.log('   Por tipo:');
  for (const [type, count] of Object.entries(byType)) {
    console.log(`     ${type}: ${count}`);
  }
  console.log('');
  console.log('   Para gerar os MP3s, itere sobre o manifest.json');
  console.log('   e envie cada entry.text para o LLM de TTS.');
}

main();
