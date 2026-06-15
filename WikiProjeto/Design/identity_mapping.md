# Mapeamento de Identidade Visual — Koiné Design System v3

## 1. Paleta de Cores (v3 Unificada)

| Token | Cor | Hex | Uso Principal |
|-------|-----|-----|---------------|
| `--koine-primary` | Dark Roast Green | `#26422A` | Títulos, elementos principais, texto grego |
| `--koine-accent` | Burnt Orange Espresso | `#EA662C` | Destaques, divisores, badges, botões |
| `--koine-accent-dark` | Accent Dark | `#C9521E` | Variente escura do acento (T05 ACCENT_IMPACT) |
| `--koine-parchment` | Oat Milk Foam | `#EFE3C4` | Fundo principal (light mode) |
| `--koine-charcoal` | Cocoa Bean | `#42302D` | Texto de corpo, logos |
| `--koine-white` | White | `#FFFFFF` | Texto em fundos escuros, badges |
| `--koine-dark-bg` | Dark Background | `#2E2220` | Fundos de variantes escuras (T02, T04) |
| `--koine-dark-card` | Dark Card | `#26422A` | Cards em fundo escuro |

## 2. Derivados de Opacidade

| Token | Valor | Uso |
|-------|-------|-----|
| `--koine-primary-08` | `rgba(38,66,42,0.08)` | Fundo sutil de pills, anchor verses |
| `--koine-primary-10` | `rgba(38,66,42,0.10)` | Variação de fundo |
| `--koine-primary-20` | `rgba(38,66,42,0.20)` | Bordas de pills, dots inativos |
| `--koine-accent-10` | `rgba(234,102,44,0.10)` | Fundo de frequency badges |
| `--koine-accent-18` | `rgba(234,102,44,0.18)` | Bordas internas da moldura |
| `--koine-accent-30` | `rgba(234,102,44,0.30)` | Uso geral |
| `--koine-accent-35` | `rgba(234,102,44,0.35)` | Bordas da moldura externa |
| `--koine-charcoal-50` | `rgba(66,48,45,0.50)` | Texto secundário |
| `--koine-charcoal-70` | `rgba(66,48,45,0.70)` | Texto intermediário |
| `--koine-white-60` | `rgba(255,255,255,0.60)` | Texto em fundos escuros (sounds, gloss) |
| `--koine-white-90` | `rgba(255,255,255,0.90)` | Texto principal em fundo escuro |

## 3. Raio de Arredondamento (Zero Cantos Retos)

| Token | Valor | Elementos |
|-------|-------|-----------|
| `--radius-pill` | `100px` | Badges, botões, divisores, dots, chips |
| `--radius-card` | `16px` | Cards de destaque, versículos, highlight boxes |
| `--radius-card-lg` | `24px` | Frames maiores (mockup celular T06) |
| `--radius-frame` | `24px` | Moldura externa dupla |
| `--radius-frame-inner` | `18px` | Moldura interna dupla |

> **Exceção:** `body` sempre `border-radius: 0` (canvas do Instagram)

## 4. Tipografia

| Fonte | CSS Variable | Uso |
|-------|-------------|-----|
| Gentium Plus | `--font-greek` | Texto grego, letras hero, versículos |
| Libre Baskerville | `--font-serif` | Corpo de texto, hooks, taglines |
| Inter | `--font-sans` | Labels, badges, CTAs, navegação |

## 5. Inventário de Templates

| ID | Nome | Formato | Paleta | Uso |
|----|------|---------|--------|-----|
| **T01** | Palavra do Dia | SQ 1080×1080 | STANDARD | Post de vocabulário único |
| **T02** | Capa Alfabeto | SQ 1080×1080 | DARK | Slide 1 de carrossel |
| **T03** | Slide Interno | SQ 1080×1080 | STANDARD | Conteúdo de carrossel |
| **T04** | Slide CTA | SQ 1080×1080 | DARK | Fechamento de carrossel |
| **T05** | Curiosidade/Versículo | SQ 1080×1080 | STANDARD | Posts informativos (dual-mode) |
| **T06** | Feature App | SQ 1080×1080 | STANDARD+DARK | Mockup de funcionalidade |
| **T07** | Wrapper Carrossel | CAR | — | Estrutura técnica para exportação |

## 6. Formatos de Saída

| Código | Dimensão | Uso |
|--------|----------|-----|
| `SQ` | 1080 × 1080 px | Feed quadrado (T01, T03, T05, T06) |
| `PORT` | 1080 × 1350 px | Feed retrato 4:5 (T01, T05 com mais texto) |
| `LAND` | 1920 × 1080 px | Stories landscape / Reels cover |
| `CAR` | 1080 × (1080 × N) px | Carrossel vertical (T07 wrapper) |

## 7. Estrutura de Pastas

```
Koine/
├── css/
│   └── design_tokens.css      # Tokens centralizados (v3 unificado)
├── templates/
│   ├── T01_palavra_do_dia.html
│   ├── T02_capa_carrossel.html
│   ├── T03_interno_carrossel.html
│   ├── T04_cta_carrossel.html
│   ├── T05_curiosidade_versiculo.html
│   ├── T06_feature_app.html
│   └── T07_wrapper.html
├── output/                     # PNGs renderizados
├── identity_mapping.md         # Este arquivo
├── ORQUESTRADOR_DESIGN_v2.md   # Pipeline de operação
└── export_png.cjs              # Script de exportação HTML→PNG
```
