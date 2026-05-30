# Plano: Trilha de Aprendizado do Aluno

## Resumo do que já existe

| Componente | Status |
|---|---|
| Ciclos 1-3 definidos no schema | ✅ |
| Ciclos 1-2 com módulos no seed | ✅ |
| TrailPage (navegação ciclos → módulos) | ✅ |
| LessonPage (executa exercícios sequencialmente) | ✅ |
| 7 tipos de exercício (flashcard, MC, fill_blank, word_order, matching, TPR, narration) | ✅ |
| Exercícios placeholder (5 por módulo, genéricos) | ⚠️ |
| Lição → resumo → volta à trilha | ✅ |
| SRS cards (revisão espaçada) | ✅ mas desconectado das lições |
| Strong Dictionary (5670 entries) | ✅ |
| Motor de conhecimento (Strong integrado ao MorphologyPanel + feedback de exercício) | ✅ |
| Vocabulário (27 palavras core) | ⚠️ mínimo |
| ReviewPage (SRS) | ✅ isolada |

---

## Etapa 1 — Conteúdo Real nos Exercícios

### 1.1 Seed de exercícios reais para Ciclo I (10 módulos)

Criar `src/services/database/seedExercises.ts` com exercícios reais baseados no vocabulário e letras de cada módulo.

**Formato**: cada módulo recebe 10-11 exercícios de tipos variados:
- Módulo 1 (Vogais Α, Ε, Ι): 2 flashcards, 2 MC, 2 fill_blank, 2 word_order, 1 TPR, 1 matching, 1 canvas
- Módulo 2-9: similar, progressão gradual
- Módulo 10 (Revisão): 11 exercícios mistos com João 1:1

**Conexão com Strong**: cada exercício que usa uma palavra grega registra o `strongs_id` no próprio dado do exercício (campo novo opcional).

### 1.2 Seed de exercícios para Ciclo II (8 módulos)

Verbos presente (εἰμί), pronomes, artigo, substantivos 2ª declinação.

### 1.3 Seed de vocabulário expandido (~150 palavras)

Distribuídas pelos módulos dos Ciclos I-III, cada uma com `strongs_id` apontando para o dicionário.

---

## Etapa 2 — Fluxo de Aprendizado Completo

### 2.1 Pré-aula: Vocabulário do Módulo ✅ (já feito)
Mostra lista de palavras do módulo com opção de ver definição Strong.

### 2.2 Aula: Exercícios → Feedback com Strong ✅ (já feito)
Cada exercício com definição do Strong no feedback de erro.

### 2.3 Pós-aula: SRS Automático

**Arquivos**: `src/pages/lesson/LessonPage.tsx`, `src/services/database/queries.ts`

**Lógica**: após `finishLesson()`, para cada palavra do vocabulário do módulo:
```ts
const upsertSRSCard({
  wordId: v.strongs_id,
  token: v.token,
  glossPT: v.gloss_pt,
  interval: 1,
  easeFactor: 2.5,
  repetitions: 0,
  nextReview: today,
  status: 'aprendendo',
});
```

### 2.4 Revisão Intercalada

Modificar `ReviewPage.tsx` para buscar cards SRS + mostrar definição Strong durante a revisão.

**Fluxo**: mostra o card → usuário tenta lembrar → "Ver definição no Strong" → autoavalia (1/3/4/5).

---

## Etapa 3 — Gamificação e Métricas

### 3.1 Métricas por palavra

Adicionar à tabela `srs_cards`:
```sql
ALTER TABLE srs_cards ADD COLUMN strong_id TEXT;
ALTER TABLE srs_cards ADD COLUMN times_seen INTEGER DEFAULT 0;
ALTER TABLE srs_cards ADD COLUMN times_correct INTEGER DEFAULT 0;
```

### 3.2 Conquistas ligadas ao Strong

| Conquista | Condição |
|---|---|
| "Lexicógrafo" | Ver 100 definições diferentes |
| "Erudito" | Acertar 50 palavras no SRS com definição Strong visível |
| "Polyglot" | Completar 10 palavras com status "mestre" no SRS |

### 3.3 Progresso visual na trilha

Cada módulo mostra:
- % de vocabulário dominado (status SRS dos cards do módulo)
- Botão "Revisar vocabulário" que abre lista com definições Strong
- Indicador de XP total vs. XP obtido

---

## Etapa 4 — Busca e Exploração de Conhecimento

### 4.1 Tela "Lexicon" (Nova rota: `/lexicon`)

Lista de busca com:
- Campo de busca (grego, português, Strong ID)
- Resultados com definição + botão "Adicionar ao SRS"
- Filtro por classe gramatical (n, v, adj, adv)
- Marcação de "favoritos" para revisão posterior

### 4.2 Integração com Leitor Interlinear

- Ao clicar numa palavra: `MorphologyPanel` (já integrado) + botão "Praticar esta palavra" 
  → abre exercício focado naquela palavra
  → adiciona ao SRS

### 4.3 Navegação por referência cruzada

No `WordPopup`, Strong entries com referências (`Sinônimos ver verbete XXXX`) viram links clicáveis:
```tsx
"G25" → link que abre definição de G25
```

---

## Etapa 5 — Personalização

### 5.1 Plano de estudos semanal

- Algoritmo que distribui: N aulas novas + M revisões SRS por dia
- Baseado no desempenho do aluno (taxa de acerto nos exercícios)
- Se acerto > 85%: sugere avançar, menos revisão
- Se acerto < 60%: mais revisão, menos conteúdo novo

### 5.2 Modo "Imersão"

No Leitor Interlinear:
- Esconde todas as `gloss_pt`
- Ao tocar numa palavra: mostra apenas a definição Strong (sem tradução direta)
- Força o aluno a inferir pelo contexto + dicionário

---

## Plano de Implementação (Ordem Sugerida)

| # | O quê | Esforço | Depende de |
|---|---|---|---|
| 1 | Seed de vocabulário expandido (150+ palavras) | 2h | — |
| 2 | Seed de exercícios reais para Ciclo I | 3h | #1 |
| 3 | Seed de exercícios reais para Ciclo II | 2h | #1 |
| 4 | SRS automático pós-lição | 1h | — |
| 5 | Definição Strong no ReviewPage | 1h | #4 |
| 6 | Tela Lexicon (busca + SRS) | 4h | — |
| 7 | Conquistas ligadas ao Strong | 2h | #4 |
| 8 | Referências cruzadas (links entre Strongs) | 1h | — |
| 9 | Plano de estudos semanal | 3h | #1-8 |
| 10 | Modo Imersão | 1h | — |
| 11 | Seed Ciclo III | 2h | #1 |

**Total estimado**: ~22 horas de implementação.
