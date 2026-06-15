# Apostila Pipeline

Pipeline codegen para transformar `.apostila.md` em código TypeScript consumível pelo app.

## Arquitetura

```
WikiProjeto/Modulos/C?-M??.apostila.md
              ↓
   src/tools/apostilaRunner.ts  (CLI, dev/CI)
              ↓
   src/tools/apostilaParser.ts  (MD → AST)
   src/tools/apostilaValidator.ts (S-01 a S-06, DS-01/02)
   src/tools/apostilaCodegen.ts  (AST → código TS)
              ↓
   src/content/curriculum/generated/C?-M??.generated.ts
              ↓
   src/content/curriculum/units.ts (re-export)
              ↓
   SQLite (seedLearningUnits)
              ↓
   TrailPage → LessonPage → Phases 1-5
```

O parser é **codegen**, não runtime. O app nunca lê `.md` diretamente.

## Comandos

| Script | O que faz |
|---|---|
| `npm run parse-apostila C1-M01` | Valida + gera 1 módulo |
| `npm run parse-apostila:all` | Valida + gera todos os `.apostila.md` |
| `npm run validate-apostila C1-M01` | Só valida, não escreve |
| `npm run validate-apostila:all` | Valida todos |

Erros bloqueiam geração. Avisos não bloqueiam (mas devem ser revisados).

## Adicionar um novo módulo

1. Gerar (via orquestrador) o arquivo `WikiProjeto/Modulos/{C1|C2}-M{NN}.apostila.md` aprovado pelo Agente de Revisão.
2. Validar: `npm run validate-apostila C1-M09`
3. Resolver todos os erros reportados (ver seção "Regras").
4. Gerar: `npm run parse-apostila C1-M09`
5. Editar `src/content/curriculum/units.ts`:
   - Adicionar `import { C1M09_UNITS } from './generated/C1-M09.generated';`
   - Remover o array inline `const C1_M09: UnitRow[] = [...]`
   - Adicionar `...C1M09_UNITS` no spread de `LEARNING_UNITS`
6. Validar build: `npm run build` (sem erros de TS nos novos arquivos).
7. Commit + sync Android.

## Formato `.apostila.md`

Ver `WikiProjeto/Estruturador/SISTEMA_FATURACAO_CONTEUDO.md` para a spec completa.

Estrutura mínima:

```markdown
---MODULO---
id: C1-M09
ciclo: 1
ordem: 9
titulo: Título do Módulo
descricao: Descrição do módulo
versiculoAncora: ἀγάπη
referenciaAncora: 1 João 4:8
metodoPrimario: ExposureCard + Múltipla Escolha
xpTotal: 60
revisadoPor: Nome do Revisor
dataRevisao: 2026-06-03
notaRevisao: Notas opcionais
---

---UNIDADE---
id: C1-M09-U01
ordem: 1
tipo: letter
srsKey: C1-M09_letter_alpha

# EXPOSIÇÃO (Fase 1 — sem avaliação)

forma: Α α
transliteracao: alfa
traducao: letra alfa
som: /a/ como em "pai"
explicacao: Texto...
dica: Dica mnemônica
versiculo: ἀγάπη
referencia: 1 João 4:8

# RECONHECIMENTO (Fase 2)

QUESTAO tipo:multiple_choice
pergunta: Qual é a letra Alfa?
correta: Α
opcoes: Α | Β | Γ | Δ
explicacao: Α (alfa) é a primeira letra.

# ASSOCIAÇÃO (Fase 3)
... outras fases ...

# RECORDAÇÃO (Fase 4)
...

---

---APLICACAO---
# Comentários opcionais

QUESTAO tipo:multiple_choice xp:3
pergunta: ...
correta: Α
opcoes: Α | Β | Γ
explicacao: ...
```

### Tipos de questão suportados

| `tipo` | Campos obrigatórios |
|---|---|
| `multiple_choice` | `correta` ∈ `opcoes` (2-4 opções) |
| `tpr_digital` | `correta` ∈ `opcoes` |
| `fill_blank` | `correta` ∈ `opcoes` |
| `matching_pairs` | `pares: A:x \| B:y \| ...` (≥2 pares), `correta` = "matching" |
| `word_order` | `correta: A B C` (split por espaço), `opcoes` |

## Regras de validação

| Regra | Severidade | Descrição |
|---|---|---|
| S-ESTRUTURA | error | id do módulo no formato `C{1,2}-MNN` |
| S-01 | error | `referencia` em formato `Livro Cap:Verse` (ex: "1 João 4:8") |
| S-02 | error | `forma` deve começar com letra grega |
| S-05 | error | Cada fase (2, 3, 4) deve ter ≥1 questão |
| S-05 | info | APLICAÇÃO ausente é recomendado, não obrigatório |
| S-06 | error | Tipos `multiple_choice`/`tpr_digital`/`fill_blank` precisam de 2-4 `opcoes` |
| S-06 | error | `correta` deve estar em `opcoes` |
| S-06 | error | `matching_pairs` precisa de ≥2 `pares` |
| S-06 | error | `word_order` precisa de `correta` como lista |
| S-DIDATICA | warning | `explicacao` < 30 chars (EXPOSIÇÃO) ou < 20 chars (QUESTAO) |
| S-XP | warning | `xpTotal` fora de 1-200 |
| S-REVISAO | warning | Sem `revisadoPor` (módulo não revisado) |
| DS-01 | warning | `opcoes` com >1 letra de módulo futuro (recomendado: max 1) |

## Troubleshooting

### "correta 'X' não está em opcoes [A, B, C]"

`correta` deve ser literalmente uma das opções. Se for uma palavra/letra mas as opções são só letras, ajuste a `correta` ou adicione a opção completa.

Exemplo: `correta: Ι (iota)` com `opcoes: Ι | Α | Ε | Β` → erro. Correção: `correta: Ι`.

### "módulo sem `revisadoPor`"

O `revisadoPor` é o que indica que o módulo passou por revisão. Sem ele, o validador emite warning. Adicione o nome do revisor e a data.

### DS-01 (letras de módulos futuros como distratores)

Limite o número de letras que ainda não foram ensinadas. O validador aceita até 1; mais que isso é warning. Use letras do próprio módulo ou dos anteriores como distratores.

## Módulos atualmente gerados

- ✅ C1-M01 (gerado, 0 erros)
- ✅ C1-M02 (gerado, 0 erros, 1 aviso DS-01)
- ⏳ C1-M03 a C2-M08 (16 módulos — aguardando `.apostila.md` do orquestrador)

## Quando os 16 módulos restantes forem gerados

Workflow: orquestrador produz `WikiProjeto/Modulos/{ID}.apostila.md` revisado e aprovado → `npm run validate-apostila {ID}` → resolver issues → `npm run parse-apostila {ID}` → editar `units.ts` para importar o novo gerado.
