"""
Validador Python equivalente ao validateCues.ts, para rodar offline.
Aplica todas as regras do cues-format-spec.md § 4.
"""
import json
import re
import sys
from pathlib import Path


def validate(cues_path):
    errors = []
    data = None
    p = Path(cues_path)

    if not p.exists():
        return [('file', f'Arquivo não encontrado: {cues_path}')]

    try:
        data = json.loads(p.read_text(encoding='utf-8'))
    except Exception as e:
        return [('file', f'JSON inválido: {e}')]

    if data.get('version') != '1.0':
        errors.append(('version', f"Esperado '1.0', recebido '{data.get('version')}'"))

    if not data.get('moduleId'):
        errors.append(('moduleId', 'moduleId é obrigatório'))

    if not data.get('audioFile'):
        errors.append(('audioFile', 'audioFile é obrigatório'))
    else:
        # Verifica se o MP3 existe (audioFile é /audio/X/X.mp3, relativo a public/)
        audio_rel = data['audioFile'].lstrip('/')
        mp3_path = p.parent.parent.parent / audio_rel
        if not mp3_path.exists():
            errors.append(('audioFile', f'MP3 não encontrado: {mp3_path}'))

    if not isinstance(data.get('duration'), (int, float)) or data['duration'] <= 0:
        errors.append(('duration', f"duration deve ser > 0, recebido {data.get('duration')}"))

    cues = data.get('cues', [])
    if not cues:
        errors.append(('cues', 'cues deve ser array não vazio'))
        return errors

    cue_ids = set()
    for i, cue in enumerate(cues):
        cid = cue.get('id')
        if not cid:
            errors.append((f'cues[{i}]', 'id é obrigatório'))
        elif cid in cue_ids:
            errors.append((f'cues[{i}].id', f'id duplicado: {cid}'))
        else:
            cue_ids.add(cid)

        st = cue.get('startTime')
        et = cue.get('endTime')
        if not isinstance(st, (int, float)) or st < 0:
            errors.append((f'cues[{i}].startTime', f'startTime inválido: {st}'))
        if not isinstance(et, (int, float)) or et <= st:
            errors.append((f'cues[{i}].endTime', f'endTime ({et}) <= startTime ({st})'))
        if i > 0:
            prev = cues[i - 1]
            if st < prev['endTime']:
                errors.append((f'cues[{i}]', f'Sobreposição: startTime={st} < prev.endTime={prev["endTime"]}'))
        if not cue.get('marker'):
            errors.append((f'cues[{i}].marker', 'marker é obrigatório'))

    groups = data.get('groups', [])
    if not groups:
        errors.append(('groups', 'groups deve ser array não vazio'))
    else:
        for i, g in enumerate(groups):
            if not g.get('id'):
                errors.append((f'groups[{i}]', 'id é obrigatório'))
            phase = g.get('lessonPhase')
            if phase and phase not in ('exposure', 'exercise'):
                errors.append((f'groups[{i}].lessonPhase', f"phase deve ser 'exposure' ou 'exercise', recebido '{phase}'"))
            cids = g.get('cueIds', [])
            if not cids:
                errors.append((f'groups[{i}].cueIds', 'cueIds deve ser array não vazio'))
            else:
                for cid in cids:
                    if cid not in cue_ids:
                        errors.append((f'groups[{i}].cueIds', f'cueId "{cid}" não encontrado em cues'))

    if cues:
        last_et = cues[-1]['endTime']
        diff = abs(data['duration'] - last_et)
        if diff > 2.0:
            errors.append(('duration', f"duration ({data['duration']}s) difere do último endTime ({last_et}s) em {diff:.1f}s"))

    return errors


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Uso: python validate_cues.py <cues.json>')
        sys.exit(1)
    errors = validate(sys.argv[1])
    if not errors:
        print('✅ cues.json válido!')
        sys.exit(0)
    print(f'❌ {len(errors)} erro(s):')
    for field, msg in errors:
        print(f'   [{field}] {msg}')
    sys.exit(1)
