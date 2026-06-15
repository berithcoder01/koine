import json

d = json.load(open(r'..\..\public\audio\C1-M01\C1-M01.cues.json', encoding='utf-8'))
print(f'C1-M01: {d["moduleTitle"]}')
print()
print('Letras ensinadas (cue UNIDADE):')
for c in d['cues']:
    if c['marker'] == 'UNIDADE':
        print(f'  - {c["text"]}')

print()
print('Palavra-âncora: agape (1 João 4:8)')
print('Versículo de aplicação: João 11:25 (Iesous eipen — "Jesus disse")')
print('Total: 3 unidades, 12 questões (3 por unidade + 3 aplicação)')
print()
print('Estrutura do Ciclo I — Bloco A (Vogais):')
print('  C1-M01: Vogais BASE        → Alfa (α), Épsilon (ε), Iota (ι)  [ESTE]')
print('  C1-M02: Vogais ABERTAS/FECHADAS → Ômicron (ο), Ípsilon (υ), Ômega (ω)')
print('  C1-M03: Consoantes FAMILIARES → Eta (η), Nu (ν), Tau (τ) [próximo]')
