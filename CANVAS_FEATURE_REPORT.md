# Canvas Feature Report

> Relatório completo da feature de validação de escrita grega no canvas.
> Gerado em 14/06/2026.

---

## 1. Visão Geral

A feature permite ao aluno traçar letras gregas em um canvas. O sistema valida se o traço do aluno corresponde à letra alvo e atribui uma pontuação de 0-100. Para ser aprovado, o aluno precisa atingir ≥ 70/100 (constante `CANVAS_PASS_SCORE`).

---

## 2. Arquivos Envolvidos

### 2.1 Core (Validação)

| Arquivo | Função |
|---------|--------|
| `src/core/utils/gridValidator.ts` | Motor principal de validação — exporta `gridValidate()` |
| `src/core/utils/validators.ts` | Helpers legados: `validateCanvasStroke()`, `isCanvasApproved()` |
| `src/core/utils/canvasTemplateGenerator.ts` | Geração de template de referência |
| `src/core/constants/config.ts` | Constantes: `CANVAS_PASS_SCORE=70`, `CANVAS_MAX_ATTEMPTS=3`, `CANVAS_PRECISION_TOLERANCE=0.15` |
| `src/core/constants/routes.ts` | Definição da rota `CANVAS: '/canvas/:letterId'` |

### 2.2 UI (Componentes)

| Arquivo | Função |
|---------|--------|
| `src/ui/pages/canvas/CanvasPage.tsx` | Página standalone de prática de escrita |
| `src/ui/exercises/CanvasExercise.tsx` | Componente de exercício embutível (usado dentro de lições) |
| `src/ui/pages/lesson/LessonPage.tsx` | Importa `CanvasExercise` para exercícios de escrita em lições |

### 2.3 Infraestrutura

| Arquivo | Função |
|---------|--------|
| `src/App.tsx` | Registra a rota `<Route path={ROUTES.CANVAS} ...>` |
| `src/features/navigation/useNavigation.ts` | Helper `goToCanvas(letterId)` |
| `src/features/database/queries.ts` | Consulta SQLite das letras (`getAllLetters`) |
| `src/features/database/seeds/seedLetters.ts` | Seed das letras gregas no banco |
| `src/content/alphabet.ts` | Definição das 24 letras gregas (dados estáticos) |

### 2.4 Dados

| Arquivo | Função |
|---------|--------|
| `src/content/alphabet.ts` | Array `LETTERS` com todas as 24 letras (id, upper, lower, name, sound) |

---

## 3. Rota e Navegação

```
/canvas/:letterId → CanvasPage
```

- **Definição:** `src/core/constants/routes.ts:11` → `CANVAS: '/canvas/:letterId'`
- **Registro:** `src/App.tsx:118` → `<Route path={ROUTES.CANVAS} element={<PrivateRoute><CanvasPage /></PrivateRoute>} />`
- **Navegação:** `src/features/navigation/useNavigation.ts:14` → `goToCanvas: (letterId) => navigate(...)`

Exemplo: `/canvas/omicron` → Canvas de prática para a letra ômicron.

---

## 4. Fluxo de Dados

```
alphabet.ts (LETTERS array)
    ↓ seedLetters.ts
SQLite (letters table)
    ↓ dbQueries.getAllLetters()
CanvasPage.tsx (carrega letter.lowerCase = 'ο')
    ↓ canvas.fillText('ο', ...)
Canvas em tela (ghost guide com alpha 0.12)
    ↓ Aluno desenha
allStrokes (Point[][])
    ↓ calculateScore(allStrokes, canvasSize, 'ο')
gridValidator.gridValidate(strokes, 'ο', canvasSize)
    ↓ getOutline('ο', canvasSize)
Template 200 pontos do outline da letra 'ο'
    ↓ countCovered(template, student)
Pontos do template tocados pelo pincel (raio 6px)
    ↓ Math.round((covered / template.length) * 100)
Score 0-100
    ↓ score >= 70?
PASS ou FAIL
```

---

## 5. Configurações Atuais

```typescript
// src/core/constants/config.ts
CANVAS_PASS_SCORE: 70        // mínimo 70/100
CANVAS_MAX_ATTEMPTS: 3       // máximo 3 tentativas
CANVAS_PRECISION_TOLERANCE: 0.15
```

```typescript
// src/core/utils/gridValidator.ts (atual)
const COVERAGE_RADIUS = 6;    // pixels — raio do pincel para cobertura
const NUM_SAMPLES = 500;      // pontos amostrados do outline
const MIN_OUTLINE = 200;      // mínimo de pixels brutos no outline
const MIN_BBOX_FRACTION = 0.50; // bounding box mínimo = 50% do canvas
```

---

## 6. Algoritmos Tentados (Cronologia)

### 6.1 Grid-Based Cell Counting (Original)

**Status:** ❌ Removido — falso-positivos

```typescript
// Abordagem: dividir o canvas em grid 30×30
// Contar células cobertas / total de células do template
// Usar F-beta com precision gates
```

**Problema:** Um traço pequeno cobria 80%+ das células do template porque:
- O grid era muito grosso (células de 10px)
- A contagem binária (célula coberta/não) perdia granularidade
- Um traço de 20px cobria ~15 células = 82/100

**Resultado no device:** 82/100 para um traço parcial de ~15% do ômicron.

---

### 6.2 Chamfer Distance (Bidirecional)

**Status:** ❌ Removido — falso-positivos

```typescript
// Abordagem: medir distância Chamfer bidirecional
// Template→Student = recall
// Student→Template = precision
// F1 score = 2 * P * R / (P + R)
// MAX_DIST = 40px (absoluto)
```

**Problema:** 
- `MAX_DIST = 40px` era muito generoso para letras que renderizavam pequenas
- O `precision` (student→template) ficava sempre alto (~1.0) mesmo para traços parciais
- A média ponderada das distâncias ainda permitia scores altos

**Correção parcial:** `MAX_DIST_FRACTION = 0.15` (proporcional ao diagonal do template). Ainda não resolveu — traços parciais continuavam passando.

**Resultado no device:** 82/100 para traço parcial.

---

### 6.3 Chamfer com MAX_DIST Scale-Invariant

**Status:** ❌ Removido — falso-positivos

```typescript
// Abordagem: MAX_DIST = diagonal(template) × 0.15
// Isso torna o threshold proporcional ao tamanho da letra
```

**Tentativas de ajuste:**
- `MAX_DIST_FRACTION = 0.15` → ainda passava
- `MAX_DIST_FRACTION = 0.06` → ainda passava
- `MIN_BBOX_FRACTION = 0.25` → não rejeitava template pequeno
- `MIN_BBOX_FRACTION = 0.50` → rejeitava, mas a métrica ainda inflava

**Problema fundamental:** A média ponderada das distâncias não é a métrica certa. Um traço preciso e curto ainda tem precision alta, o que infla o F1.

**Resultado no device:** 82-84/100 para traço parcial.

---

### 6.4 Contagem Direta de Cobertura (Atual)

**Status:** 🔄 Em teste

```typescript
// Abordagem: contar quantos dos 500 pontos do outline
// estão a ≤ 6px de qualquer ponto do traço do aluno.
// Score = (covered / 500) × 100
```

```typescript
function countCovered(template, student): number {
  let covered = 0;
  const radiusSq = COVERAGE_RADIUS * COVERAGE_RADIUS; // 36
  for (const t of template) {
    for (const s of student) {
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      if (dx * dx + dy * dy <= radiusSq) {
        covered++;
        break; // cada ponto do template contado apenas 1 vez
      }
    }
  }
  return covered;
}
```

**Vantagens teóricas:**
- Mede diretamente "quantos pontos da letra foram tocados pelo pincel"
- Métrica binária (tocado ou não) — sem pesos intermediários
- `break` impede double-counting
- Traço de 30px em ômicron de 500px circunferência → ~15-20 pontos → score ~3-4%

**Parâmetros atuais:**
| Parâmetro | Valor | Motivo |
|-----------|-------|--------|
| `COVERAGE_RADIUS` | 6 | Igual ao `lineWidth` do canvas |
| `NUM_SAMPLES` | 500 | Mais pontos = mais granular |
| `MIN_OUTLINE` | 200 | Rejeita outlines muito pequenos |
| `MIN_BBOX_FRACTION` | 0.50 | Força fonte a renderizar ≥ 50% do canvas |

**Resultado no device:** ⚠️ Ainda em teste — relato anterior indicava 84/100 para traço parcial.

---

## 7. Problema Não Resolvido

### Sintoma
Um traço pequeno (não representando nem 15% da letra) continua sendo aprovado com nota ≥ 70/100.

### Teorias

| # | Teoria | Status |
|---|--------|--------|
| 1 | Fonte SBL Greek não carrega no device, fallback renderiza letra minúscula | Possível — `MIN_BBOX_FRACTION` deveria bloquear |
| 2 | `document.createElement('canvas')` não tem acesso às mesmas fontes que o canvas visível | Possível — canvas offscreen vs. canvas em tela |
| 3 | O cache `OUTLINE_CACHE` guarda template de renderização anterior e reutiliza | Possível — mas `MIN_BBOX_FRACTION` deveria filtrar |
| 4 | O `isInk` classifica pixels demais como ink, criando outline inflado | Possível — threshold `data[idx] < 160` é generoso |
| 5 | A contagem de pontos do outline é feita no canvas OFFSCREEN, não no visível | Possível — mas ambos usam `canvasSize` |

### Diagnóstico Adicionado
```typescript
console.log(
  `[KOINE] letter=${letter} canvas=${canvasSize} ` +
  `outlinePx=${template.length} diagonal=${Math.round(diag)} ` +
  `bboxPct=${Math.round(diag/canvasSize*100)}% ` +
  `covered=${covered}/${template.length} score=${score}` +
  ` studentPts=${student.length}`
);
```

**Para capturar os logs:**
```bash
adb logcat -s ChromeIO:V
# ou
adb logcat | findstr "KOINE"
```

---

## 8. Dependências e Integrações

### Componentes que usam Canvas

```
LessonPage.tsx
  └── CanvasExercise.tsx
        └── gridValidate()

App.tsx
  └── CanvasPage.tsx
        └── gridValidate()
```

### Dados das letras

```
alphabet.ts (LETTERS array)
  └── seedLetters.ts (INSERT INTO letters)
        └── SQLite letters table
              └── dbQueries.getAllLetters()
                    └── CanvasPage.tsx (letter.lowerCase = 'ο')
```

### Fontes para renderização

```
CanvasPage / CanvasExercise (ghost guide):
  ctx.font = `bold ${canvas.width * 0.75}px SBL Greek, Gentium Plus, serif`

gridValidator (template):
  ctx.font = `bold ${canvasSize * 0.75}px SBL Greek, Gentium Plus, serif`
```

---

## 9. Testes

**Nenhum teste unitário ou de integração existe para a feature canvas.**

Buscas realizadas:
- `**/*canvas*test*` → 0 resultados
- `**/*canvas*.spec.*` → 0 resultados
- `**/*test*canvas*` → 0 resultados
- Grep por `canvas|Canvas` em `*.test.*` → 0 resultados

---

## 10. Referências

### Configurações de canvas

```typescript
// CanvasPage.tsx
const size = Math.min(window.innerWidth - 32, 340);
setCanvasSize(size); // tipicamente 300-340px

// CanvasExercise.tsx
const size = Math.min(window.innerWidth - 48, 320);
setCanvasSize(size); // tipicamente 272-320px
```

### Parâmetros de desenho

```typescript
// CanvasPage.tsx: draw()
ctx.strokeStyle = '#2A5C8A';
ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Ghost guide
ctx.globalAlpha = 0.12;
ctx.fillStyle = '#1A3A5C';
```

### XP e gamificação

```typescript
// CanvasPage.tsx
XP_VALUES.CANVAS_FIRST_TRY  // primeira tentativa
XP_VALUES.CANVAS_SECOND_TRY // segunda tentativa
```

---

## 11. Conclusão

A feature Canvas implementa prática de escrita grega com validação visual. O problema persistente é que **traços parciais continuam sendo aprovados**. Todas as abordagens baseadas em distância (grid, Chamfer) falharam porque permitem que traços curtos mas precisos tenham scores altos. A abordagem atual de contagem direta de cobertura é a mais promissora, mas precisa de validação no device para confirmar que resolve o problema.

**Próximos passos:**
1. Capturar logs do `[KOINE]` para entender os valores reais no device
2. Validar se `MIN_BBOX_FRACTION=0.50` está efetivamente rejeitando templates pequenos
3. Se necessário, testar com `COVERAGE_RADIUS` maior (8-10px) ou adicionar verificação de segmento (ponto-to-segment distance)
4. Implementar testes unitários para `gridValidate` com cenários controlados
