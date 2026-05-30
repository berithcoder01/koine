# Plano: Integração de Versículos Reais nas Aulas

## Objetivo
Cada exercício da trilha usar texto real do NT grego, com referência visível para que o aluno pratique leitura autêntica desde o início.

## Como funciona

### 1. Campo `verse_ref` nos exercícios

Adicionar coluna opcional na tabela `exercises`:
```sql
ALTER TABLE exercises ADD COLUMN verse_ref TEXT;
```
Ex: `"João 3:16"`, `"1 João 4:8"`, `"Mateus 5:14"`

### 2. Mapeamento módulo → versículos

| Módulo | Versículo chave | Motivo |
|---|---|---|
| C1-M01 | João 1:1-3 | Vogais A, E, I + artigo + verbo |
| C1-M02 | Romanos 8:28, João 14:6 | O, Y, Ω |
| C1-M03 | Mateus 5:3-10 | Eta, Nu, Tau |
| C1-M04 | João 3:16 | Sigma, Kappa, Lambda |
| C1-M05 | Mateus 6:9-13 | Pi, Rho, Mu |
| C1-M06 | João 1:1-5 | Beta, Delta, Gamma |
| C1-M07 | 1 Coríntios 13:1-13 | Phi, Chi, Theta |
| C1-M08 | Apocalipse 1:8 | Zeta, Xi, Psi |
| C1-M09 | João 1:1-18 | Diacríticos |
| C1-M10 | João 1:1 | Revisão |
| C2-M01 | João 14:6 | εἰμί singular |
| C2-M02 | Mateus 5:14 | εἰμί plural |
| C2-M03 | João 10:11 | Pronomes |
| C2-M04 | João 1:1-3 | Artigo |
| C2-M05 | 1 Coríntios 13 | 2ª declinação |
| C2-M06 | 1 João 4:8 | Predicado nominal |
| C2-M07 | João 3:16-18 | Verbos λέγω/ἔχω/πιστεύω |
| C2-M08 | 1 João 4:7-9 | Revisão |

### 3. Extração de tokens do nt_text

Usar a tabela `nt_text` que já existe:
```sql
SELECT * FROM nt_text WHERE book_abbr='JN' AND chapter=3 AND verse=16 ORDER BY position
```

### 4. Exercícios com referência

Nos exercícios seed, adicionar `verse_ref`:
```ts
{ type: 'fill_blank', ..., verse_ref: 'João 3:16' }
```

No `LessonContentView`, exibir badge com a referência ao lado do texto grego.
No `ExerciseFeedback`, mostrar "João 3:16" no rodapé da explicação.

### 5. Leitor embutido nas aulas

Antes dos exercícios de um módulo que tem versículo-chave, mostrar o texto completo do versículo com:
- Palavras destacadas que serão praticadas
- Strong links nas palavras
- Botão "Ir para o Leitor Interlinear" que navega para `ReaderPage` com o versículo

## Implementação (ordem)

| # | O quê | Arquivos | Esforço |
|---|---|---|---|
| 1 | ALTER TABLE exercises ADD verse_ref | schema.ts | 5min |
| 2 | Adicionar `verse_ref` nos seeds existentes | seedExercises.ts | 1h |
| 3 | Badge de referência no LessonContentView | LessonContentView.tsx | 30min |
| 4 | Badge no ExerciseFeedback | ExerciseFeedback.tsx | 15min |
| 5 | Componente VerseReader (mini-leitor nas aulas) | components/greek/VerseReader.tsx | 1h |
| 6 | Link "Ir para Leitor" nas aulas | LessonPage.tsx | 15min |
