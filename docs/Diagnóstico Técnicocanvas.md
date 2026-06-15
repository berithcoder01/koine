🤖 **Applying knowledge of `@[debugger]` and `@[frontend-specialist]`...**

Olá! Fiz uma análise aprofundada do arquivo 

CANVAS_FEATURE_REPORT.md, das lógicas implementadas em 

gridValidator.ts e dos componentes de UI para entender o motivo de o validador aprovar traços curtíssimos (falsos-positivos de escrita).

Abaixo apresento o diagnóstico detalhado e as abordagens recomendadas para resolver este problema definitivamente.

---

## 🔍 Diagnóstico Técnico: Por que o bug acontece?

Analisando matematicamente os logs de exemplo reais gerados pelo validador:

> `[KOINE] letter=ο canvas=300 outlinePx=500 diagonal=204 bboxPct=68% covered=420/500 score=84 studentPts=142`

Geometricamente, se a letra grega $o$ (ômicron) renderizada no canvas de $300\times300$ tem uma diagonal de **204px**, isso significa que o contorno (outline) de referência descreve um círculo de aproximadamente **144px de diâmetro**, com um perímetro de cerca de **452px**. Se o usuário desenha apenas um traço curto de $15%$ da letra (cerca de $68\text{px}$ de extensão), mesmo que esse traço seja $100%$ preciso, o raio de cobertura de $6\text{px}$ cobriria no máximo cerca de $80\text{px}$ do contorno. Isso representaria **$\approx 17%$ de cobertura** (um score de $17/100$, que seria reprovado).

No entanto, o log mostra que o aluno desenhou **142 pontos** (um traço pequeno) e cobriu **420 de 500 pontos do template (84/100)**! Isso revela a causa raiz física do problema:

### 1. A Causa Raiz: Latência de Fonte no Canvas Offscreen e Cache Corrompido

O validador dinâmico cria um canvas offscreen na memória (`document.createElement('canvas')`) e tenta renderizar a letra alvo usando a fonte customizada:

typescript

ctx.font = `bold ${canvasSize * 0.75}px SBL Greek, Gentium Plus, serif`;

1. **Latência de Carregamento:** Quando o exercício é aberto pela primeira vez, o arquivo de fonte `/assets/fonts/SBLGreek.ttf` pode demorar alguns milissegundos para ser totalmente parseado e carregado na memória do navegador/WebView do dispositivo.
2. **Fallback Minúsculo:** Nesse intervalo inicial, se o validador for acionado, ele desenha o caractere usando a fonte de fallback. Se o caractere grego minúsculo não for suportado pela fonte padrão do dispositivo ou renderizar em um tamanho minúsculo (um pequeno borrão central ou glifo de substituição), o contorno bruto gerado será extremamente compactado no centro (ex: ocupando uma área de $15\times15\text{px}$).
3. **Falso Sinal de Diagonal:** Se houver qualquer ruído de pixel na borda do canvas (por exemplo, suavização de renderização ou anti-aliasing nos cantos), a distância máxima entre os pontos (`getDiagonal`) será calculada como grande (ex: 204px), passando pelo filtro `MIN_BBOX_FRACTION`.
4. **Cache Envenenado:** O array de 500 pontos do template — onde **$90%$ dos pontos estão empilhados no centro** e alguns poucos ruídos nas pontas — é gravado permanentemente no `OUTLINE_CACHE`.
5. **Aprovação Automática:** Quando o aluno desenha um traço simples sobre a guia visual (que ele vê em tamanho correto na tela), ele acaba cobrindo todo o aglomerado de pontos minúsculo do template offscreen corrompido, obtendo scores de $80%+$ instantaneamente.

### 2. Falha Conceitual: Falta de Medição de Proporção Física (Bounding Box)

Atualmente, o validador calcula apenas a cobertura dos pontos do template, mas não valida se a **escala espacial do desenho do aluno condiz com o tamanho da letra**. Se um aluno desenhar um ponto perfeito sobre uma parte da letra, ele não deveria ser aprovado, pois falta o restante do caractere.

---

## 🛠️ Abordagens Propostas para Resolução

### Abordagem A: Validação Física por Diagonal de Bounding Box (Rápida e Eficaz)

*Ideal para corrigir o problema imediatamente sem mexer na estrutura de fontes do projeto.*

Adicionamos uma etapa na validação que compara as caixas delimitadoras (Bounding Boxes) do desenho do estudante e do template. Se o estudante desenhar apenas um traço curto, a diagonal da bounding box dos seus pontos será muito pequena em relação à diagonal do template.

- **Lógica:**
  
  typescript
  
  const studentDiag = getDiagonal(student); // Calcula a diagonal do traço do aluno
  
  const templateDiag = getDiagonal(template);
  
  // Se o aluno desenhou algo com dimensões menores que 60% da letra alvo, reprova
  
  if (studentDiag < templateDiag * 0.60) {
  
    return 0; // ou reduz drasticamente o score
  
  }

- **Prós:** Extremamente simples de implementar, impede falsos-positivos de traços pequenos imediatamente, mesmo se o template estiver ligeiramente desalinhado.

- **Contras:** Não resolve a causa raiz de a fonte falhar no canvas offscreen.

### Abordagem B: Correção do Ciclo de Vida da Fonte e do Canvas Offscreen

*Corrige a renderização do canvas em memória no dispositivo móvel.*

1. **Aguardar Fontes:** Usar a API nativa de fontes do navegador (`document.fonts.ready` ou `document.fonts.check`) para garantir que a fonte `SBL Greek` está carregada antes de inicializar o canvas de desenho e gerar o contorno.
2. **Prevenir Cache Incorreto:** Não salvar o template no `OUTLINE_CACHE` se detectarmos que a fonte ainda não está carregada na memória (evitando cachear dados corrompidos).
3. **Limpeza e Restrição de Cor:** Refinar o método `isInk` para ignorar ruídos de pixel nas bordas extremas do canvas.
- **Prós:** Resolve o problema técnico de renderização offscreen.
- **Contras:** A leitura direta de pixels via `getImageData` continua sendo uma operação síncrona pesada para dispositivos móveis de baixo desempenho.

### Abordagem C: Validação Baseada em Caminhos Vetoriais (SVG Path / Polilinhas)

*A solução definitiva e mais profissional para aplicativos de escrita (padrão Duolingo).*

Em vez de renderizar texto e ler pixels da tela, mapeamos os caminhos das 24 letras gregas no arquivo 

alphabet.ts no campo `svgPath` (que hoje está `null`) como uma lista ordenada de pontos normalizados.

- **Como funciona:** O aluno desenha no canvas e comparamos o vetor de pontos dele com o vetor de pontos de referência da letra grega, usando algoritmos simples de distância de curvas (como o *$1 Gesture Recognizer* ou distância média de caminhos).
- **Prós:**
  - $100%$ independente de fontes do sistema ou problemas de renderização de canvas.
  - Performance absurdamente rápida (apenas cálculo matemático simples, sem ler buffer de imagem).
  - Permite validar a **direção do traço e a ordem da escrita** (ex: se o aluno desenhou o alfa começando de cima ou de baixo).
- **Contras:** Requer mapear ou extrair a lista de pontos/vetores de referência para as letras gregas (minúsculas e maiúsculas) e adicioná-las aos dados estáticos do projeto.
