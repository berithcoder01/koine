# Koine — Design System & Regras de Desenvolvimento

> Documento de referência para manter consistência visual em toda a aplicação.
> Qualquer novo componente ou página DEVE seguir estas regras.

---

## 1. Botões

### Componente: `<Button>` (`src/ui/components/Button.tsx`)

| Contexto | Radius | Tamanho | Exemplo |
|---|---|---|---|
| Botão principal (CTA largo) | `radius="full"` | `size="lg"` | "Entrar", "Criar Conta", "Continuar" |
| Botão largo secundário | `radius="md"` | `size="lg"` | "Entrar com Google" |
| Botão de ícone circular | `radius="full"` | `size="sm"` ou `size="md"` | Botões de ação com ícone |
| Botão de texto/link | `radius="md"` | automático | "Já tem uma conta? Entrar" |
| Botão de ação no card | `radius="full"` | `size="sm"` | "Revisar", "Ir" |

**Regra de ouro:** Todo `<Button>` **DEVE** ter `radius` definido. O default é `radius="md"`.

### Botões raw (`<button>` HTML)

| Contexto | ClassName | Radius |
|---|---|---|
| Ícone circular | `!rounded-full` | `9999px` |
| Card clicável | `rounded-2xl` ou `rounded-3xl` | 16-24px |
| Botão de toggle/filtro | `rounded-full` | `9999px` |

**NUNCA:** `rounded-none`, `rounded-sm`, ou sem `rounded` em botões.

---

## 2. Cards

### Padrão de card

```tsx
<div className="bg-surface dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm">
```

| Propriedade | Valor | Observação |
|---|---|---|
| `borderRadius` | `rounded-3xl` (24px) | **Padrão para todos os cards** |
| `padding` | `p-5` (20px) | Consistente |
| `background` | `bg-surface` (light) / `bg-surface-alt/30` (dark) | Sempre com contraste |
| `border` | `border-border/40` (light) / `border-border/10` (dark) | Sutil |
| `shadow` | `shadow-sm` | Nunca `shadow-none` |

### Card com gradiente (destaque)

```tsx
<div className="bg-gradient-to-r from-card-purple/60 to-card-purple/30 ... rounded-3xl p-5">
```

### Card de atividade (bloqueada)

```tsx
<div className="opacity-60 pointer-events-none select-none rounded-3xl p-5">
```

**NUNCA:** Cards com cantos quadrados (`rounded-none`) ou `rounded-sm`.

---

## 3. Ícones

| Contexto | Tamanho | Container | ClassName |
|---|---|---|---|
| Ícone em card de atividade | `20-24px` | `w-10 h-10 rounded-2xl` ou `w-11 h-11 rounded-full` | `text-primary` ou `text-card-purple-text` |
| Ícone de navegação | `20px` | Nenhum | `text-text-secondary` |
| Ícone de status (lock, check) | `14-16px` | Nenhum | `text-text-secondary` |

**Fonte de ícones:** `lucide-react` (principal) ou `@reacticons/ionicons` (fallback).

---

## 4. Tipografia

| Elemento | Classe | Exemplo |
|---|---|---|
| Título de página | `text-2xl font-extrabold tracking-tight` | "Atividades" |
| Título de seção | `text-sm font-bold` | "Prática de Escrita" |
| Subtítulo/descrição | `text-[11px] text-text-secondary` | "Desenhe as letras gregas..." |
| Label pequeno | `text-[10px] font-extrabold uppercase tracking-wider` | "TRILHA PARALELA" |
| Texto de badge | `text-xs font-bold` | "15 módulos" |
| Texto grego | `font-greek text-greek-md` | Letras do NT |

### Cores de texto

| Uso | Light | Dark |
|---|---|---|
| Texto principal | `text-text-primary` | `dark:text-white` |
| Texto secundário | `text-text-secondary` | `dark:text-zinc-400` |
| Texto desabilitado | `text-text-disabled` | — |
| Texto de destaque | `text-primary` | `dark:text-primary-light` |
| Texto de erro | `text-error-text` | `dark:text-error` |

---

## 5. Espaçamento e Layout

| Elemento | Gap/Spacing |
|---|---|
| Cards em lista | `gap-6` |
| Itens dentro do card | `gap-3` ou `gap-4` |
| Grid de letras | `grid-cols-6 gap-2` |
| Seção → próxima seção | `mb-4` a `mb-6` |
| Header → conteúdo | `px-4 pt-6 pb-5` |
| Conteúdo rolável | `px-4 py-4 pb-28` (espaço para BottomNav) |

---

## 6. Temas (Light/Dark)

### Paleta de cores

| Token | Light | Dark |
|---|---|---|
| `primary` | `#1A3A5C` (azul escuro) | `#4A8BC2` |
| `secondary` | `#C9973A` (dourado) | `#D4A84B` |
| `background` | `#F5F0E8` (bege) | `#121212` |
| `surface` | `#FFFFFF` | `#1E1E1E` |
| `surface-alt` | `#F8F8F8` | `#2A2A2A` |
| `border` | `#E0E0E0` | `#333333` |
| `text-primary` | `#1A1A1A` | `#FFFFFF` |
| `text-secondary` | `#6B6B6B` | `#A0A0A0` |

### Regras de contraste

- Todo card **DEVE** ter `dark:` variant para background e border.
- Texto em background escuro **DEVE** usar `dark:text-white` ou `dark:text-zinc-400`.
- Nunca usar `text-text-primary` sem `dark:text-white` em cards escuros.
- Ícones em containers escuros **DEVEM** ter contraste adequado.

---

## 7. Animações

| Contexto | Propriedade |
|---|---|
| Botão pressionado | `whileTap={{ scale: 0.97 }}` ou `active:scale-95` |
| Card aparecendo | `animate-fadeIn` ou `motion.div` com `initial/animate` |
| Transição de página | `transition duration-200` |
| Loading spinner | `animate-spin` em `<svg>` |

**NUNCA:** Animações lentas (>300ms) em elementos interativos.

---

## 8. Formulários

### Input

```tsx
<Input
  variant="bordered"
  radius="md"
  size="lg"
  label="Label"
  placeholder="Placeholder"
/>
```

### Validação

| Campo | Regra | Mensagem |
|---|---|---|
| Email | regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "E-mail inválido" |
| Senha | 8+ chars, 1 maiúscula, 1 número | "A senha deve ter 8+ caracteres, 1 maiúscula e 1 número" |
| Nome | Não vazio | "Preencha todos os campos" |

---

## 9. Navegação

| Elemento | Posição | Estilo |
|---|---|---|
| Header com voltar | Topo da página | `ArrowLeft` icon + título `font-extrabold text-xl` |
| BottomNav | Fixo embaixo | 4-5 itens com ícones |
| Cards clicáveis | No scroll | `whileTap={{ scale: 0.97 }}` |

---

## 10. BottomSheets e Painéis Deslizantes

### Componente: `<BottomSheet>` (`src/ui/components/BottomSheet.tsx`)

> Padrão universal para conteúdos que precisam de scroll interno, contexto do usuário e fechamento fácil.

| Propriedade | Valor | Observação |
|---|---|---|
| `isOpen` | `boolean` | Controlado pelo pai (`!!data`) |
| `onClose` | `() => void` | Fechar ao arrastar, clicar backdrop, ou botão X |
| `height` | `'auto' \| 'full'` | `'auto'` = max 85vh; `'full'` = 95vh |
| `title` | `string` | Opcional — aparece no header |

### Visual Structure (de cima para baixo)

```
┌─────────────────────────────┐
│         ━━━━━ (handle)      │  ← w-12 h-1.5 bg-border/80 rounded-full
│  Título              [X]   │  ← header com título + botão fechar
│─────────────────────────────│  ← border-b
│                             │
│  [Conteúdo com scroll       │  ← flex-1 overflow-y-auto px-6 pb-10
│   interno]                  │
│                             │
└─────────────────────────────┘
```

### Comportamento

| Aspecto | Implementação |
|---|---|
| Animação de entrada | Spring: `y: '100%' → 0`, `damping: 25`, `stiffness: 220` |
| Drag para fechar | `drag="y"`, threshold: `offset.y > 120` ou `velocity.y > 400` |
| Backdrop | `bg-black/50 backdrop-blur-[2px]`, clicável para fechar |
| Scroll lock | `document.body.style.overflow = 'hidden'` quando aberto |
| Portal | Renderiza em `#modal-root` via `createPortal` |
| z-index | `z-50` |

### Quando usar

| Padrão | Componente | Quando |
|---|---|---|
| Conteúdo rico com scroll | `<BottomSheet>` | Detalhe de unidade, definição, configuração |
| Seletor de opções | `<BottomSheet>` | Selecionar livro/capítulo, filtrar |
| Informação contextual | `<BottomSheet>` | Palavra do dia, análise morfológica |
| Card que expande | `<BottomSheet>` | **NUNCA expandir card inline** — sempre abrir sheet |

**NUNCA:** Expandir conteúdo dentro do próprio card (causa scroll longo e confuso). Sempre abrir BottomSheet.

---

## 11. Pílulas (Cards Horizontais)

> Cards horizontais compactos para listas onde o espaço vertical é precioso.

### Padrão de pílula

```tsx
<button className="w-full flex items-center gap-3 bg-surface/80 dark:bg-surface-alt/40
  border border-border/30 dark:border-border/15 rounded-full px-4 py-3
  shadow-sm active:scale-[0.98] transition-all text-left">
  {/* Bullet/ícone à esquerda */}
  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
  {/* Conteúdo */}
  <div className="flex-1 min-w-0">
    <p className="text-text-primary dark:text-white font-bold text-sm truncate">Título</p>
    <p className="text-text-secondary dark:text-zinc-400 text-[10px]">Subtítulo</p>
  </div>
  {/* Badge à direita */}
  <span className="text-secondary text-xs font-bold shrink-0">60 XP</span>
</button>
```

| Propriedade | Valor |
|---|---|
| `borderRadius` | `rounded-full` (9999px) |
| `padding` | `px-4 py-3` |
| `min-height` | 48dp (touch target) |
| `gap` | `gap-3` |
| `truncate` | `truncate` no título (1 linha) |

### Quando usar pílulas

- Módulos dentro de um bloco colapsável
- Opções de seleção em lista
- Itens de menu/navigation
- Qualquer item que navega para detalhe

**NUNCA:** Pílulas com `rounded-2xl` ou `rounded-xl` (meio-termo). Ou é `rounded-full` (pílula) ou `rounded-2xl`/`rounded-3xl` (card).

---

## 12. Cards de História (Trilha Paralela)

### Block Card (Visão Geral)

```tsx
<button className={`w-full text-left border rounded-3xl p-5 shadow-sm
  transition-all duration-200 ${theme.bg} ${theme.border}`}>
  <p className={`text-[10px] font-extrabold uppercase tracking-wider ${theme.text}`}>
    {block.subtitle}
  </p>
  <h3 className="text-text-primary dark:text-white font-black text-base">
    {block.title}
  </h3>
  <p className="text-text-secondary dark:text-zinc-400 text-xs">
    {block.description}
  </p>
</button>
```

| Elemento | Classe |
|---|---|
| Container | `rounded-3xl p-5 border` |
| Badge | `text-[10px] font-extrabold uppercase tracking-wider` |
| Título | `font-black text-base` |
| Descrição | `text-xs text-text-secondary` |
| Cor por bloco | via `BLOCK_THEMES` (H1=azul, H2=verde, H3=roxo, H4=âmbar) |

### Module Card (dentro do bloco)

Formato **pílula horizontal** (ver seção 11).

### Unit Card (detalhe do módulo)

```tsx
<button className="w-full bg-surface/80 dark:bg-surface-alt/40
  border border-border/30 dark:border-border/15 rounded-2xl p-4
  shadow-sm text-left active:scale-[0.99] transition-all">
  {/* Número + Título + ChevRight */}
  {/* Metadata: período, local, figura */}
  {/* Preview: 2-3 linhas do conteúdo */}
  {/* Conexão bíblica */}
</button>
```

| Elemento | Classe |
|---|---|
| Container | `rounded-2xl p-4` |
| Número | `w-8 h-8 rounded-full bg-secondary/15` |
| Título | `font-bold text-sm` |
| Metadata | `text-[10px] text-text-secondary` |
| Preview | `text-xs line-clamp-3` |

### Comportamento de interação

| Ação | Resultado |
|---|---|
| Clicar no bloco | Expande/recolhe módulos (colapsável) |
| Clicar no módulo | Navega para `/history/:moduleId` |
| Clicar na unidade | Abre `<BottomSheet>` com conteúdo completo |

**NUNCA:** Expandir unidade inline no card. Sempre usar BottomSheet.

---

## 13. Checklist antes de entregar componente

- [ ] Todo `<Button>` tem `radius` definido
- [ ] Todo card tem `rounded-3xl` (card) ou `rounded-full` (pílula)
- [ ] Todo card tem `dark:` variant
- [ ] Ícones têm container arredondado (`rounded-2xl` ou `rounded-full`)
- [ ] Texto tem contraste adequado no tema dark
- [ ] Botões de ação têm feedback visual (`active:scale-95`)
- [ ] Espaçamento segue o padrão `gap-6` entre cards
- [ ] Header usa `ArrowLeft` + `font-extrabold text-xl`
- [ ] Nenhum elemento com cantos quadrados
- [ ] Conteúdo detalhado usa `<BottomSheet>`, nunca expansão inline
- [ ] Pílulas usam `rounded-full`, cards usam `rounded-3xl`
- [ ] Touch targets ≥ 48dp
- [ ] Listas com mais de 3 itens consideram performance (memo, key estável)
- [ ] Labels usam `text-[10px] font-extrabold uppercase tracking-wider`
- [ ] Subtítulos usam `text-[11px] text-text-secondary`
- [ ] Valores numéricos/badges usam cor `secondary` (dourado)
