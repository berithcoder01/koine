import json

with open('../../public/audio/C1-M01/C1-M01.cues.json', encoding='utf-8') as f:
    d = json.load(f)

cues_count = len(d['cues'])
groups_count = len(d['groups'])
duration = d['duration']
last = d['cues'][-1]
diff = abs(d['duration'] - last['endTime'])

exp_groups = [g for g in d['groups'] if g['lessonPhase'] == 'exposure']
ex_groups = [g for g in d['groups'] if g['lessonPhase'] == 'exercise']
skippable = [g for g in d['groups'] if g.get('canSkip')]

print(f'Module: {d["moduleId"]} — {d["moduleTitle"]}')
print(f'Cues: {cues_count}')
print(f'Groups: {groups_count} ({len(exp_groups)} exposição + {len(ex_groups)} exercício)')
print(f'Skippable: {len(skippable)}/{len(ex_groups)} (apenas exercícios)')
print(f'Duração: {duration}s ({duration/60:.1f} min)')
print(f'Último cue: {last["id"]} ({last["marker"]}) endTime={last["endTime"]}s')
print(f'Diff: {diff:.2f}s')
print()
print('GRUPOS POR UNIDADE:')
units = {}
for g in d['groups']:
    uid = g.get('unitId', 'sem-unidade')
    units.setdefault(uid, []).append(g['id'])
for uid, gids in units.items():
    print(f'  {uid}: {len(gids)} grupos  →  {", ".join(gids)}')

# Validação cruzada: contagem de cues por grupo
print()
print('VALIDAÇÃO CRUZADA:')
for g in d['groups']:
    cue_count = len(g['cueIds'])
    all_exist = all(cid in {c['id'] for c in d['cues']} for cid in g['cueIds'])
    if not all_exist:
        print(f'  ❌ {g["id"]}: cueIds inexistentes')
    else:
        first_cue = next(c for c in d['cues'] if c['id'] == g['cueIds'][0])
        last_cue = next(c for c in d['cues'] if c['id'] == g['cueIds'][-1])
        dur = last_cue['endTime'] - first_cue['startTime']
        print(f'  ✓ {g["id"]:<40} {g["lessonPhase"]:<10} {cue_count} cues, {dur:.1f}s')
