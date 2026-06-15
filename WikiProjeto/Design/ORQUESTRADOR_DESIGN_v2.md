# ORQUESTRADOR DE DESIGN GRÁFICO — KOINÉ v3 (Unificado)

## Sistema de Geração de Artes HTML → PNG para Instagram

> **v3.0 — Fusão Claude + Manus:**
> - CSS externalizado via `design_tokens.css` (Manus)
> - Templates prefixedados com `tXX-*` (Claude) para evitar colisão no T07
> - T05 com dual-mode Curiosidade + Versículo (Claude)
> - 7 templates completos, todos auto-contidos exceto CSS
> - Paleta v3 unificada com todos os tokens de ambos os sistemas

---

## ⚠️ MODELO DE NEGÓCIO — INFORMAÇÃO OBRIGATÓRIA

> **O Koiné NÃO é um app gratuito.**
>
> - **Grátis para testar:** O aluno pode experimentar os primeiros módulos sem pagar.
> - **Pago para continuar:** Após o período de teste, é necessária assinatura ou compra para acessar o conteúdo completo.
>
> **REGRAS PARA CTAs E TEXTOS PROMOCIONAIS:**
> - ✅ CORRETO: "Experimente grátis", "Teste sem compromisso", "Comece grátis"
> - ✅ CORRETO: "Desbloqueie todo o conteúdo", "Assine o Koiné"
> - ❌ ERRADO: "Grátis para sempre", "App gratuito", "Baixe grátis" (sem contexto de teste)
> - ❌ ERRADO: "100% grátis" ou qualquer afirmação de gratuidade total
>
> **Frase aprovada para CTAs:**
> - "Comece grátis — desbloqueie todo o conteúdo com uma assinatura"
> - "Teste os primeiros módulos grátis"
> - "Disponível para iOS e Android"

---

## 1. PIPELINE

```
[AGENTE DE CONTEÚDO]
  → Gera: texto, gancho, corpo, CTA, hashtags, briefing
            │
            ▼
[AGENTE DE DESIGN]  ← este documento
  → Seleciona template por tipo de post
  → Injeta variáveis de conteúdo nos {{SLOTS}}
  → Aplica paleta v3 e tipografia oficial
  → Respeita regra zero cantos retos
  → Gera: HTML pronto para renderização
            │
            ▼
[EXPORTADOR HTML → PNG]
  → export_png.cjs (Puppeteer + Chrome)
  → Renderiza em viewport 1080×1080
  → Exporta PNG ao lado do HTML
            │
            ├──────────────────────────┐
            ▼                          ▼
[AGENTE DE LEGENDA]            [ARQUIVO .md]
  ORQUESTRADOR_LEGENDA_v1        (mesmo nome do PNG)
  → Gera: legenda + hashtags     → Salvo em output/
  → Tom: educativo+devocional     → Pronto para publicação
            │                          │
            └────────────┬─────────────┘
                         ▼
[ORQUESTRADOR FINAL]
  → Empacota: PNG + .md (legenda + hashtags)
  → Entrega: pronto para publicação
```

### 1.1 Regra de Nomenclatura (OBRIGATÓRIO)

Cada arte final gera **dois arquivos** na pasta `output/` com o **mesmo nome base**:

| Arquivo | Extensão | Conteúdo |
|---------|----------|----------|
| `T01_logos.png` | `.png` | Imagem renderizada (1080×1080) |
| `T01_logos.md` | `.md` | Legenda + hashtags (Instagram copy) |

> **O Agente de Design DEVE sempre gerar o `.md` junto com o `.png`.**
> O nome base idêntico permite pairing automático para publicação.

## 2. SELEÇÃO DE TEMPLATE

| Post Type | Template | Paleta | Descrição |
|-----------|----------|--------|-----------|
| **A** (Palavra do Dia) | T01 | STANDARD | Vocabulário + versículo |
| **B** (Carrossel App Features) | T02+T03+T04 via T07 | DARK/STD | Capa + features app + CTA |
| **F** (Carrossel Alfabeto) | T02_alfabeto+T03_alfabeto+T04_alfabeto via T07_alfabeto | DARK/STD | Capa letra + origem + palavra + versículo + CTA |
| **C** (Curiosidade) | T05 (modo curiosidade) | STANDARD | Números + facts + versículo |
| **D** (Feature App) | T06 | STD+DARK | Mockup de funcionalidade |
| **E** (Versículo do Dia) | T05 (modo versículo) | STANDARD | Versículo hero + destaque |

## 3. SISTEMA DE SLOTS

### 3.1 T01 — Palavra do Dia

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{GREEK_WORD}}` | texto | `εἰρήνη` |
| `{{GREEK_BG_CHAR}}` | char | `ε` |
| `{{TRANSLIT}}` | texto | `eirene` |
| `{{TRANSLATION}}` | texto | `PAZ` |
| `{{FREQ_NUMBER}}` | número | `92` |
| `{{HOOK}}` | frase | `Paz não é ausência de conflito.` |
| `{{VERSE_GREEK}}` | grego | `εἰρήνην τὴν ἐμὴν δίδωμι ὑμῖν` |
| `{{VERSE_REF}}` | ref | `João 14:27` |

### 3.2 T02 — Capa do Carrossel (App Introduction)

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{APP_TAGLINE}}` | frase | `Aprenda grego do Novo Testamento` |
| `{{APP_TAGLINE_SUB}}` | frase | `Deslize para conhecer as funcionalidades` |

> **Propósito:** Apresentar o app Koiné e convidar a deslizar para conhecer as features.

### 3.3 T03 — Slide Interno (Feature Showcase)

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{FEATURE_ICON}}` | emoji | `📖` |
| `{{FEATURE_TITLE}}` | texto | `Modo Interlinear` |
| `{{FEATURE_DESCRIPTION}}` | texto | `Leia o NT em grego com tradução palavra a palavra` |
| `{{FEATURE_DETAIL}}` | texto | `Toque em qualquer palavra para ver a definição completa` |
| `{{SLIDE_CURRENT}}` | número | `2` |
| `{{SLIDE_TOTAL}}` | número | `5` |

> **Propósito:** Cada slide mostra uma funcionalidade do app. Usar 3-4 slides para features principais.

**Features sugeridas:**
1. **Modo Interlinear** — leitura NT grego com tradução palavra a palavra
2. **Canvas Interativo** — prática de escrita das letras gregas
3. **Flashcards Inteligentes** — repetição espaçada de vocabulário
4. **Áudio de Pronúncia** — ouvir pronúncia nativa

### 3.4 T04 — Slide CTA (Install App)

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{CTA_HEADLINE}}` | frase | `Comece agora mesmo` |
| `{{CTA_BODY}}` | texto | `Disponível gratuitamente para iOS e Android` |
| `{{CTA_APP_STORE}}` | texto | `App Store` |
| `{{CTA_GOOGLE_PLAY}}` | texto | `Google Play` |

> **Propósito:** Convencer o usuário a testar o app com CTA claro e botões de download.
>
> **CTAs aprovados (respeitar modelo de negócio — grátis para testar, não grátis para sempre):**
> - `{{CTA_HEADLINE}}`: "Comece grátis" / "Experimente sem compromisso"
> - `{{CTA_BODY}}`: "Teste os primeiros módulos grátis. Desbloqueie todo o conteúdo com uma assinatura." / "Comece grátis — continue com uma assinatura."
> - ❌ NUNCA: "Grátis para sempre", "100% grátis", "App gratuito"

### 3.5 T02/T03/T04 — Carrossel Alfabeto (Post Type F)

**T02_capa_alfabeto:** Capa com letra maiúscula/minúscula, nome, som e tagline editorial.

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{LETTER_UPPER}}` | char | `Α` |
| `{{LETTER_LOWER}}` | char | `α` |
| `{{LETTER_NAME}}` | texto | `Alfa` |
| `{{LETTER_SOUND}}` | texto | `/a/ — como "a" em "pai"` |
| `{{LETTER_INDEX}}` | texto | `Letra 1 de 24` |
| `{{TAGLINE}}` | frase | `A letra que abre o alfabeto...` |

> **Metodologia editorial:** 1.1 A (forma visual) + B (nome/som). Tom de professor apresentando a letra.

**T03_interno_alfabeto:** Slide de ensino com coluna esquerda (visual) e direita (2 seções editoriais).

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{SLIDE_TOPIC}}` | texto | `Como se escreve` |
| `{{SLIDE_CURRENT}}` | número | `2` |
| `{{SLIDE_TOTAL}}` | número | `5` |
| `{{LEFT_PRIMARY}}` | HTML | `Α α` ou `ἀγάπη` |
| `{{LEFT_SECONDARY}}` | HTML | `= amor` ou `som /a/` |
| `{{MAIN_TITLE}}` | texto | `De onde vem o Alfa` |
| `{{SECTION_A_LABEL}}` | texto | `Origem` |
| `{{SECTION_A_TEXT}}` | texto | Conteúdo da seção A |
| `{{SECTION_B_LABEL}}` | texto | `Forma` |
| `{{SECTION_B_TEXT}}` | texto | Conteúdo da seção B |

> **Uso recomendado por slide:**
> - **Slide 2** (Como se escreve): A = Origem, B = Forma (metodologia 1.1 A + C)
> - **Slide 3** (Palavra-exemplo): A = A palavra, B = Onde aparece (metodologia 1.1 B + E)
> - **Slide 4** (No Texto): A = Versículo, B = Dica mnemônica (metodologia 1.1 D)

**T04_cta_alfabeto:** CTA com letra decorativa + botões de instalação.

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{LETTER_UPPER}}` | char | `Α` |
| `{{LETTER_LOWER}}` | char | `α` |
| `{{LETTER_INDEX}}` | texto | `Letra 1 de 24` |
| `{{CTA_HEADLINE}}` | frase | `Aprenda grego de verdade` |
| `{{CTA_BODY}}` | texto | `Baixe o Koiné App...` |
| `{{CTA_APP_STORE}}` | texto | `App Store` |
| `{{CTA_GOOGLE_PLAY}}` | texto | `Google Play` |

### 3.6 T05 — Curiosidade / Versículo (Dual-Mode)

**Sempre presente:**

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{CATEGORY}}` | texto | `Curiosidade` ou `Versículo do Dia` |
| `{{HOOK}}` | frase | Conteúdo principal |
| `{{VERSE_REF}}` | ref | `João 1:1` |

**Modo Curiosidade (POST_TYPE=C):**

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{IMPACT_NUMBER}}` | número | `9.153` (condicional) |
| `{{IMPACT_LABEL}}` | texto | `vezes no NT` (condicional) |
| `{{VERSE_GREEK}}` | grego | Versículo de ancora |
| `{{GREEK_FEATURE}}` | grego | `θεός` (condicional) |
| `{{GREEK_FEATURE_TRANSLIT}}` | texto | `theos` (condicional) |
| `{{HIGHLIGHT_TEXT}}` | HTML | Texto destaque (condicional) |

**Modo Versículo (POST_TYPE=E):**

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{VERSE_GREEK_FULL}}` | grego | `Ἐν ἀρχῇ ἦν ὁ λόγος` |

### 3.6 T06 — Feature App

| Slot | Tipo | Exemplo |
|------|------|---------|
| `{{FEATURE_HOOK}}` | texto | `Leia o NT em grego com tradução palavra a palavra` |
| `{{FEATURE_BODY}}` | texto | Descrição da funcionalidade |
| `{{MOCKUP_LABEL}}` | texto | `Modo Interlinear` |
| `{{MOCKUP_GREEK}}` | grego | `Ἐν ἀρχῇ ἦν ὁ λόγος` |
| `{{MOCKUP_GLOSS}}` | texto | `Em · princípio · era · o · Palavra` |
| `{{MOCKUP_REF}}` | ref | `João 1:1` |

## 4. GERAÇÃO DE PAGINAÇÃO (Carrosséis)

Para `META_SLIDE_TOTAL = N`, gerar N `<span>`:

```html
<span class="page-dot page-dot--active"></span>  <!-- slide 1 = ativo -->
<span class="page-dot"></span>
<span class="page-dot"></span>
```

- **T02 (capa/T02_alfabeto):** dot 1 sempre ativo
- **T03 (interno/T03_alfabeto):** dot = `SLIDE_CURRENT` ativo
- **T04 (CTA/T04_alfabeto):** último dot sempre ativo

## 5. REGRAS DE COMPOSIÇÃO

### 5.1 Zero Cantos Retos
- `body` → `border-radius: 0` (canvas do Instagram, obrigatório)
- Todos os elementos → usar tokens `--radius-*`
- Exceção: `.slide` no T07 herda `overflow: hidden` do canvas

### 5.2 Fonte Grega
- Palavras gregas → sempre `var(--font-greek)` (Gentium Plus)
- Fallback: SBL Greek, Noto Serif, serif

### 5.3 Hierarquia Visual
1. **Hero** (176px+): palavra grega principal
2. **Título** (48-64px): nomes, versículos full
3. **Corpo** (28-32px): hooks, textos descritivos
4. **Label** (16-20px): pills, badges, refs

### 5.4 Espaçamento
- Padding interno: `72px 80px 64px` (padrão)
- Gap entre blocos: `24-40px`
- Moldura: `inset: 28px` (externa), `inset: 6px` (interna)

## 6. COMANDO DE EXPORTAÇÃO

```bash
# Exportar todos os outputs (Clude + Manus + Koine)
node WikiProjeto/Design/export_png.cjs

# Exportar apenas Koine
node WikiProjeto/Design/export_png.cjs WikiProjeto/Design/Koine/output

# Exportar um template específico (para teste)
node WikiProjeto/Design/export_png.cjs WikiProjeto/Design/Koine/templates/T01_palavra_do_dia.html
```

## 7. FORMATOS SUPORTADOS

| Código | Dimensão | Uso |
|--------|----------|-----|
| `SQ` | 1080 × 1080 px | Feed quadrado |
| `PORT` | 1080 × 1350 px | Feed retrato 4:5 |
| `LAND` | 1920 × 1080 px | Stories landscape |
| `CAR` | 1080 × (1080 × N) px | Carrossel vertical |

> **Carrossel:** HTML único de altura `1080 × N`. Exportador corta em fatias de 1080px.
