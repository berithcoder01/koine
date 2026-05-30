# Plano de Tarefas — Refatoração Visual (Koine)

Este arquivo detalha o plano de tarefas sequenciais para a refatoração visual do aplicativo, alinhado com o `implementation_plan.md` do sistema.

## 📊 Visão Geral
* **Tipo do Projeto:** MOBILE (Capacitor/React)
* **Agente Principal:** `mobile-developer` / `frontend-specialist`
* **Skills Utilizadas:** `mobile-design`, `frontend-design`, `react-best-practices`

---

## 📝 Tarefas

### Fase 1: Fundação & Estilização
#### Tarefa 1.1: Atualizar o index.css com Design Tokens Modernos
* **Agente:** `frontend-specialist`
* **Skills:** `tailwind-patterns`, `frontend-design`
* **Prioridade:** P0
* **Dependências:** Nenhuma
* **INPUT:** [src/index.css](file:///c:/Users/marco/Documents/BerithCode/Koine/src/index.css)
* **OUTPUT:** Tokens de cores pastéis, bordas super arredondadas (`rounded-3xl` e customizadas de 24px/32px) e estilos globais atualizados.
* **VERIFY:** Checar o arquivo CSS compilado e garantir a ausência de cores rígidas antigas ou tons inadequados de roxo.

---

### Fase 2: Layout & Navegação Global
#### Tarefa 2.1: Implementar Transição de Páginas no SafeArea
* **Agente:** `frontend-specialist`
* **Skills:** `frontend-design`, `react-best-practices`
* **Prioridade:** P1
* **Dependências:** Tarefa 1.1
* **INPUT:** [SafeArea.tsx](file:///c:/Users/marco/Documents/BerithCode/Koine/src/components/layout/SafeArea.tsx)
* **OUTPUT:** Wrapper `motion.div` animado que faz as páginas esvanecerem e deslizarem suavemente ao entrar.
* **VERIFY:** Navegar entre rotas e verificar visualmente a animação no navegador.

#### Tarefa 2.2: Redesenhar o Menu Inferior (BottomNav) Animado
* **Agente:** `mobile-developer`
* **Skills:** `mobile-design`, `frontend-design`
* **Prioridade:** P1
* **Dependências:** Tarefa 2.1
* **INPUT:** [BottomNav.tsx](file:///c:/Users/marco/Documents/BerithCode/Koine/src/components/layout/BottomNav.tsx)
* **OUTPUT:** Menu inferior estilo dock flutuante com indicador de aba ativa deslizante via Framer Motion (`layoutId`).
* **VERIFY:** Clicar nos ícones e validar a animação fluida do balão ativo deslizando lateralmente.

---

### Fase 3: Dashboard & Calendário
#### Tarefa 3.1: Criar o Componente de Calendário Horizontal Semanal
* **Agente:** `mobile-developer`
* **Skills:** `mobile-design`
* **Prioridade:** P1
* **Dependências:** Tarefa 1.1
* **INPUT:** Criar novo componente `src/pages/trail/components/WeeklyCalendar.tsx`
* **OUTPUT:** Componente de calendário mostrando a semana atual, destacando o dia selecionado e o progresso da ofensiva.
* **VERIFY:** Importar e renderizar o componente na página inicial isoladamente.

#### Tarefa 3.2: Refatorar a TrailPage com o Novo Design
* **Agente:** `frontend-specialist`
* **Skills:** `frontend-design`
* **Prioridade:** P2
* **Dependências:** Tarefa 3.1, Tarefa 2.2
* **INPUT:** [TrailPage.tsx](file:///c:/Users/marco/Documents/BerithCode/Koine/src/pages/trail/TrailPage.tsx)
* **OUTPUT:** Dashboard leve com cabeçalho integrado, calendário no topo, cards de ciclos pastéis super arredondados.
* **VERIFY:** Abrir o dashboard no tema claro e escuro e certificar-se de que a interface segue as referências de inspiração.

---

### Fase X: Validação Final
* [x] Rodar `npm run build` para garantir integridade do TypeScript.
* [x] Validar compatibilidade de cores e acessibilidade.

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Success
- Date: 2026-05-30
