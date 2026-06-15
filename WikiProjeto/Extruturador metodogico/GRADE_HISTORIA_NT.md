# GRADE CURRICULAR — HISTÓRIA DO NOVO TESTAMENTO
## Módulo Extracurricular: Contexto Histórico, Geográfico e Cultural
### Documento de Referência v1.0 — Koiné App

---

## POSIÇÃO NO SISTEMA

Este documento define um **Trilha Paralela** do Koiné App — conteúdo extracurricular que
complementa os Ciclos de grego sem ser pré-requisito deles. O aluno pode cursá-la em qualquer
ordem, mas a experiência é mais rica quando acompanha o avanço no Ciclo I e Ciclo II.

```
TRILHA PRINCIPAL         TRILHA PARALELA
─────────────────        ──────────────────────────────────────
Ciclo I  — Alfabeto   ←→ Bloco H1 — O Mundo Que Viu Jesus Nascer
Ciclo II — Verbos     ←→ Bloco H2 — Jerusalém: A Cidade e o Templo
Ciclo III+            ←→ Bloco H3 — Os Escritores e os Textos
                         Bloco H4 — Como o NT Chegou Até Você
```

Estrutura de leitura deste documento: idêntica à da GRADE_CURRICULAR_KOINE.md.
Produção de conteúdo: seguir ORQUESTRADOR_EDITORIAL.md e SISTEMA_FATURACAO_CONTEUDO.md.
Tipo de unidades usado: `context_history` (novo tipo — ver Seção de Formato Técnico).

---

## FILOSOFIA DA TRILHA

O aluno que abre o Koiné provavelmente já conhece os textos bíblicos em português. O que ele
**não tem** é o mapa mental do mundo onde esses textos foram escritos.

Quando ele lê "Paulo escreveu aos Filipenses", não vê Filipos. Quando lê sobre o Templo, não
tem noção de escala. Quando lê que Jesus foi a Jerusalém para a Páscoa, não sabe que aquele
era um deslocamento de 120 km a pé, com centenas de milhares de peregrinos, sob ocupação
romana, numa cidade de tensão política permanente.

Esta trilha não é catequese. É **arqueologia do contexto** — o solo onde as palavras gregas
cresceram. Sem esse solo, as palavras flutuam.

### O modelo mental do autor ao escrever cada módulo desta trilha:

> "Sou um guia de turismo em Jerusalém, no ano 30 d.C. O aluno acabou de chegar.
> Ele conhece a história pelo texto bíblico, mas nunca esteve aqui. Quero que ao
> final desta aula ele consiga imaginar onde estava de pé quando ouviu aquela frase."

---

## MAPA GERAL DA TRILHA

```
BLOCO H1 — O MUNDO QUE VIU JESUS NASCER         (4 módulos)
  H1-M01 — O Mediterrâneo no Século I
  H1-M02 — O Império Romano: Poder, Estradas e Paz
  H1-M03 — A Palestina sob Roma: Heródes, Procuradores e Tensão
  H1-M04 — Judaísmo do Segundo Templo: Fariseus, Saduceus, Essênios e Zelotes

BLOCO H2 — JERUSALÉM: A CIDADE E O TEMPLO        (4 módulos)
  H2-M01 — Jerusalém: Topografia, Bairros e Vida Cotidiana
  H2-M02 — O Templo de Herodes: Arquitetura, Funcionamento e Simbolismo
  H2-M03 — A Semana da Páscoa: O Que Estava Acontecendo na Cidade
  H2-M04 — Cafarnaum, Galileia e os Caminhos de Jesus

BLOCO H3 — OS ESCRITORES E OS TEXTOS             (4 módulos)
  H3-M01 — Paulo: De Tarso a Roma — Vida, Viagens e Contexto das Cartas
  H3-M02 — João: Éfeso, a Comunidade Joanina e o Evangelho do Amor
  H3-M03 — Lucas e Atos: O Médico, o Historiador e a Expansão da Igreja
  H3-M04 — Marcos, Mateus e o Problema Sinótico

BLOCO H4 — COMO O NT CHEGOU ATÉ VOCÊ            (3 módulos)
  H4-M01 — Do Papiro ao Códice: Como os Textos Eram Escritos e Copiados
  H4-M02 — Cânon, Manuscritos e Tradução: O Texto que Você Lê
  H4-M03 — A Septuaginta e o AT que Paulo Conhecia
```

**Total:** 15 módulos · ~15 semanas de estudo paralelo
**XP estimado:** 55–65 XP por módulo · ~900 XP na trilha completa
**Nível de acesso:** Bloco H1 e H2 — Freemium · Bloco H3 e H4 — Premium

---

## FORMATO TÉCNICO — TIPO `context_history`

Esta trilha usa um novo tipo de unidade: `context_history`. Ele se comporta como o tipo
`grammar_rule` do Ciclo I, com estas diferenças:

```
tipo: context_history

Seções obrigatórias da unidade:
  # EXPOSIÇÃO       → narrativa histórica (4–8 linhas, tom de guia)
  # MAPA/IMAGEM     → descrição de mapa, ilustração ou artefato (campo `artefato`)
  # CONEXÃO BÍBLICA → versículo(s) que ganham sentido com o contexto
  # RECONHECIMENTO  → Fase 2 — identificação de fatos
  # ASSOCIAÇÃO      → Fase 3 — conectar evento/lugar/pessoa a contexto
  # APLICAÇÃO       → Fase 4 — o aluno lê um trecho bíblico com os olhos novos

Campo adicional no cabeçalho da EXPOSIÇÃO:
  periodo:    [ex: "63 a.C. – 70 d.C."]
  lugar:      [ex: "Palestina, Síria, Ásia Menor"]
  personagem: [ex: "Herodes, o Grande / Pôncio Pilatos"]
  artefato:   [ex: "Moeda de Herodes / Inscrição de Pilatos em Cesareia"]
```

**Mapeamento para UnitRow:**

```typescript
// Campos adicionais para context_history
period_label:    string;   // "63 a.C. – 70 d.C."
location_label:  string;   // "Palestina"
key_figure:      string;   // "Herodes, o Grande"
artifact_note:   string;   // nota sobre artefato ou mapa relacionado
bible_connection: string;  // versículo(s) que ganham novo sentido
```

---

## BLOCO H1 — O MUNDO QUE VIU JESUS NASCER

**Versículo-troféu do bloco:** Lucas 2:1 —
*Ἐγένετο δὲ ἐν ταῖς ἡμέραις ἐκείναις ἐξῆλθεν δόγμα παρὰ Καίσαρος Αὐγούστου
ἀπογράφεσθαι πᾶσαν τὴν οἰκουμένην.*
"Aconteceu que naqueles dias saiu um decreto de César Augusto para que todo o mundo fosse
recenseado."

**Meta do aluno ao concluir o Bloco H1:**
Conseguir responder: "Por que o NT foi escrito em grego? Por que Roma deixou os judeus
praticarem sua religião? O que eram os fariseus e por que eles conflitavam com Jesus?"
E ser capaz de situar esses atores no mapa político do século I.

---

### H1-M01 — O Mediterrâneo no Século I: Por Que o Grego?

**ID:** H1-M01
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** 336 a.C. – 30 d.C.
**Lugares-chave:** Macedônia, Alexandria, Antioquia, Roma

**Palavra-âncora do módulo:** οἰκουμένη (mundo habitado / ecúmeno)
*Justificativa:* É a palavra de Lucas 2:1 — "todo o mundo foi recenseado". Ela resume
o alcance do Império e explica por que uma língua franca era necessária.

**Unidades:**

| Ordem | Tema | Personagem/Evento central | Conexão bíblica |
|-------|------|--------------------------|----------------|
| U01 | Alexandre e o grego como língua global | Alexandre Magno (336–323 a.C.) | João 12:20 — gregos que queriam ver Jesus |
| U02 | A Diáspora Judaica e o grego koiné | Judeus em Alexandria e Antioquia | Atos 6:1 — helenistas vs. hebreus |
| U03 | Augusto e a Pax Romana | César Augusto (27 a.C. – 14 d.C.) | Lucas 2:1 — o censo |

**Conteúdo obrigatório por unidade:**

*U01 — Alexandre e o grego como língua global:*
- Alexandre conquista do Egito à Índia entre 334 e 323 a.C. Ao morrer com 32 anos, deixa
  um legado mais duradouro do que qualquer conquista territorial: a língua grega como
  idioma comum de todo o mundo mediterrâneo e do Oriente Próximo.
- O grego koiné ("comum") não é o grego clássico de Platão — é uma versão simplificada,
  mesclada com influências locais, falada por gregos e não-gregos igualmente. É o grego
  que um pescador da Galileia, um fariseu de Tarso e um procurador romano conseguiam usar
  para se comunicar.
- Conexão bíblica: João 12:20 — "havia alguns gregos entre os que tinham subido para
  adorar na festa." Gregos (não judeus) vão ao Templo em Jerusalém, falam com Felipe
  (nome grego), que fala com André (nome grego), que fala com Jesus. Esta cena seria
  impossível sem o mundo helenizado de Alexandre.
- Artefato: mapa das conquistas de Alexandre com sobreposição das cidades onde Paulo
  depois plantará igrejas (mesmas rotas, 350 anos depois).
- Dica contextual: "Paulo não precisou aprender idiomas para evangelizar. Alexandre
  já tinha feito esse trabalho 350 anos antes."

*U02 — A Diáspora Judaica e o grego koiné:*
- Após as conquistas assíria (722 a.C.) e babilônica (586 a.C.) e as migrações voluntárias
  subsequentes, judeus viviam espalhados por todo o Mediterrâneo. Na época de Jesus,
  estimava-se que mais judeus viviam fora da Palestina do que dentro dela.
- Alexandria tinha a maior comunidade judaica fora de Jerusalém — e foi lá que nasceu a
  Septuaginta (LXX), a tradução do AT para o grego, entre os séculos III e I a.C.
  Os judeus da diáspora usavam o grego como primeira língua.
- Isso explica um dado surpreendente: Paulo, judeu de Tarso, criado "aos pés de Gamaliel"
  em Jerusalém, escreve suas cartas em grego fluente — porque o grego era a língua dos
  judeus cultos fora da Palestina.
- Conexão bíblica: Atos 6:1 — "naqueles dias, como os discípulos iam aumentando,
  houve uma murmuração dos helenistas (gregos) contra os hebreus." Esta tensão dentro
  da própria comunidade cristã primitiva reflete a divisão linguística e cultural que
  existia dentro do judaísmo.
- Artefato: mapa das comunidades judaicas na diáspora com estimativas populacionais.

*U03 — Augusto e a Pax Romana:*
- César Augusto (27 a.C. – 14 d.C.) é o imperador no trono quando Jesus nasce. A "Pax
  Romana" — paz romana — não era paz no sentido moderno; era a supressão violenta de
  toda resistência. Mas seu efeito prático era estabilidade, estradas funcionando,
  comércio fluindo, e a possibilidade de viajar de Roma à Síria sem cruzar fronteiras.
- Três condições criadas por Roma tornaram o NT possível: (1) a língua comum (grego),
  (2) as estradas (Via Appia, Via Egnatia — Paulo as usou todas), (3) o correio e a
  possibilidade de enviar cartas a comunidades distantes.
- O censo de Lucas 2:1 é historicamente controverso em seus detalhes, mas reflete
  a realidade do aparato administrativo romano — o Império controlava e contava sua
  população com regularidade.
- Conexão bíblica: Lucas 2:1–7 — o censo que leva José e Maria de Nazaré a Belém.
  A logística do Império Romano moveu uma família grávida 120 km para que uma profecia
  de Miqueias 5:2 se cumprisse.
- Artefato: mapa das estradas romanas no século I com rotas das viagens missionárias
  de Paulo sobrepostas.

**Fase de Aplicação:**
- Questão 1 (multiple_choice): Por que o NT foi escrito em grego e não em aramaico
  (a língua que Jesus falava)? [4 opções, resposta: língua comum do mundo mediterrâneo]
- Questão 2 (matching_pairs): Conecte evento histórico → impacto no NT:
  Conquistas de Alexandre → grego como língua franca |
  Diáspora judaica → comunidades para Paulo visitar |
  Pax Romana → estradas e cartas chegando às igrejas
- Questão 3 (fill_blank): A palavra οἰκουμένη em Lucas 2:1 significa ___.
  Opções: [mundo habitado | cidade santa | povo eleito | templo sagrado]

---

### H1-M02 — O Império Romano: Poder, Estradas e a Máquina Administrativa

**ID:** H1-M02
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** 27 a.C. – 100 d.C.
**Lugares-chave:** Roma, Via Appia, Via Egnatia, Cesareia Marítima

**Palavra-âncora do módulo:** εἰρήνη (paz — a "pax" romana que Paulo subverte)
*Justificativa:* O Império proclamava εἰρήνη como sua dádiva ao mundo. Paulo usa a mesma
palavra para descrever algo completamente diferente. O contraste é intencional.

**Unidades:**

| Ordem | Tema | Personagem/Evento | Conexão bíblica |
|-------|------|------------------|----------------|
| U01 | Como Roma governava províncias | Sistema de procuradores e legados | Lucas 3:1 — a lista de governantes |
| U02 | As estradas romanas e o correio | Via Egnatia (rota de Paulo) | Romanos 15:19–24 — planos de viagem de Paulo |
| U03 | Cidadania romana e seus privilégios | Paulo, cidadão romano | Atos 22:25–29 — Paulo e a cidadania |

**Conteúdo obrigatório por unidade:**

*U01 — Como Roma governava províncias:*
- O Império dividia seus territórios em províncias senatoriais (estáveis, administradas
  pelo Senado) e províncias imperiais (fronteiras ou zonas de tensão, administradas
  diretamente pelo imperador através de legados). A Judeia era província imperial —
  classificada como zona de risco.
- O governador de uma província imperial recebia o título de praefectus ou procurator.
  Pôncio Pilatos era praefectus da Judeia (26–36 d.C.) — confirmado por uma inscrição
  de pedra encontrada em Cesareia Marítima em 1961, com seu nome gravado.
- O sistema tinha três camadas: o governador romano (autoridade militar e judicial
  suprema), a aristocracia local colaboracionista (o Sumo Sacerdote e o Sinédrio em
  Jerusalém), e a população. Este arranjo gerava a tensão que permeia os Evangelhos.
- Conexão bíblica: Lucas 3:1–2 — Lucas lista seis autoridades políticas e religiosas
  ao mesmo tempo para situar o início do ministério de João Batista. É um ato deliberado
  de historiador: "no 15º ano do reinado de Tibério César, sendo Pôncio Pilatos
  governador da Judeia..." — data histórica precisa, verificável.
- Artefato: a Inscrição de Pilatos — o único artefato arqueológico que menciona Pôncio
  Pilatos por nome. Encontrada em Cesareia, hoje no Museu de Israel.

*U02 — As estradas romanas e o correio:*
- Roma construiu ~85.000 km de estradas pavimentadas em todo o Império — uma rede que
  durou séculos. Estradas eram primariamente militares (movimentar legiões), mas
  tornaram-se artérias de comércio, comunicação e, no século I, evangelização.
- A Via Egnatia cruzava a Macedonia de Dirráquio (costa adriática) a Bizâncio — passando
  por Filipos, Tessalônica e Bereia. Paulo a percorreu nas viagens missionárias. Quando
  ele escreve aos Filipenses e aos Tessalonicenses, está escrevendo para cidades nessa
  estrada.
- Cartas podiam viajar de Roma a Antioquia em ~6–8 semanas pelos serviços postais
  romanos (cursus publicus). Paulo usava portadores pessoais — Tíquico, Febe, Epafrodito.
  A carta aos Romanos foi provavelmente entregue por Febe (Romanos 16:1–2).
- Conexão bíblica: Romanos 15:24–28 — Paulo planeja ir à Espanha via Roma, depois de
  entregar a coleta em Jerusalém. Esse plano só fazia sentido com as estradas romanas.
- Artefato: mapa da Via Egnatia com as cidades onde Paulo fundou igrejas marcadas.

*U03 — Cidadania romana e seus privilégios:*
- Ser cidadão romano no século I era uma distinção enorme — dava direito a julgamento
  em Roma, proteção contra punições sumárias, e acesso a cargos e comércio privilegiados.
  Em 212 d.C. todos os habitantes livres do Império receberiam a cidadania; até então,
  era herança ou concessão.
- Paulo era cidadão romano de nascença (Atos 22:28) — o que sugere que sua família de
  Tarso havia recebido a cidadania, possivelmente por serviços ao Império. Isso o tornava
  simultaneamente judeu devoto, cidadão romano e falante nativo de grego: um triângulo
  de identidades que explica seu alcance missionário único.
- A cidadania aparece em Atos como recurso narrativo recorrente: Paulo a invoca para
  impedir punições ilegais (Atos 16:37–38), para ser levado a Cesareia em vez de ser
  julgado em Jerusalém (Atos 25:11), e finalmente para apelar a César.
- Conexão bíblica: Atos 22:25–29 — o tribuno descobre que Paulo é cidadão romano e
  recua. A cidadania literalmente salva Paulo neste momento. Mas há ironia: Paulo vai
  preferir a cidadania celestial (Filipenses 3:20 — πολίτευμα ἐν οὐρανοῖς).
- Artefato: reprodução de um diploma de cidadania romana do século I (tabuinhas de bronze
  dobradas, seladas).

**Fase de Aplicação:**
- Questão 1 (multiple_choice): A Inscrição de Pilatos, encontrada em 1961, é importante
  porque... [confirma arqueologicamente a existência histórica de Pôncio Pilatos]
- Questão 2 (fill_blank): A Via ___ era a estrada que ligava a Macedonia ao Mediterrâneo
  oriental, e Paulo a usou em suas viagens missionárias. [Egnatia]
- Questão 3 (tpr_digital): Em Atos 22, Paulo usa sua ___ romana para impedir uma punição
  ilegal. [cidadania]

---

### H1-M03 — A Palestina sob Roma: Herodes, Procuradores e a Tensão Permanente

**ID:** H1-M03
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** 37 a.C. – 70 d.C.
**Lugares-chave:** Jerusalém, Cesareia Marítima, Jericó, Massada

**Palavra-âncora do módulo:** βασιλεύς (rei — o título que Herodes usurpou e que Roma
deu e tirou de seus sucessores)
*Justificativa:* O conflito em torno de quem merece o título de βασιλεύς — Herodes,
César, ou Jesus — permeia os Evangelhos. Pilatos pergunta: "És tu o rei dos judeus?"

**Unidades:**

| Ordem | Tema | Personagem central | Conexão bíblica |
|-------|------|--------------------|----------------|
| U01 | Herodes, o Grande: o rei construtor | Herodes I (37–4 a.C.) | Mateus 2:1–16 — massacre dos inocentes |
| U02 — | Arquelaos, Antipas e Filipe: a herança dividida | Herodes Antipas (4 a.C.–39 d.C.) | Lucas 23:7–12 — Jesus diante de Antipas |
| U03 | Pôncio Pilatos e os procuradores romanos | Pilatos (26–36 d.C.) | João 18:28–19:22 — o julgamento |

**Conteúdo obrigatório por unidade:**

*U01 — Herodes, o Grande:*
- Herodes governou a Judeia de 37 a 4 a.C. como "rei dos judeus" por nomeação do Senado
  romano — não por linhagem davídica, mas por conveniência política. Era idumeu (edomita),
  não judeu de nascença, o que nunca foi perdoado pelo povo.
- Seu projeto de construção foi monumental: o porto de Cesareia Marítima (com tecnologia
  de concreto subaquático romano), a fortaleza de Massada, o palácio de Jericó, e — mais
  importante — a reconstrução e expansão radical do Templo de Jerusalém, que tornou o
  monte do Templo no complexo religioso mais impressionante do Mediterrâneo.
- O massacre dos inocentes (Mateus 2) é consistente com o caráter histórico de Herodes:
  ele mandou executar três filhos próprios, sua esposa preferida e inúmeros opositores.
  O historiador romano Macróbio registra que Augusto disse: "prefiro ser o porco de
  Herodes do que seu filho." (Herodes seguia as leis alimentares judaicas — não comia
  porco — mas matava filhos.)
- Herodes morre em 4 a.C. — o que obriga os historiadores a datarem o nascimento de
  Jesus antes de 4 a.C. (provavelmente 6–4 a.C.). O calendário que usamos tem um erro
  introduzido no século VI pelo monge Dionísio, o Pequeno.
- Conexão bíblica: Mateus 2:1–18 — os magos, Herodes e o massacre. O versículo-chave:
  "Herodes ficou perturbado, e com ele toda Jerusalém" (Mt 2:3). "Toda Jerusalém" —
  porque a cidade sabia o que Herodes era capaz.
- Artefato: fotografia aérea do Monte do Templo com sobreposição da planta herodiana.

*U02 — Herodes Antipas e a herança dividida:*
- Quando Herodes morreu, seu reino foi dividido entre três filhos. Arquelaos ficou com
  a Judeia (mas foi tão violento que Roma o exilou em 6 d.C. e assumiu controle direto).
  Herodes Filipe ficou com os territórios a nordeste. Herodes Antipas ficou com a Galileia
  e Pereia — e é o "Herodes" dos Evangelhos sinóticos.
- Herodes Antipas mandou decapitar João Batista (Marcos 6:14–29) — confirmado pelo
  historiador Flávio Josefo, que descreve o encarceramento e morte de João na fortaleza
  de Maqueronte.
- Quando Jesus é enviado a Antipas por Pilatos, Antipas "ficou muito contente" — queria
  ver um milagre, como entretenimento. A cena é simultaneamente tragicômica e aterrorizante.
  Jesus não diz uma palavra a Antipas (Lucas 23:9).
- A relação de Antipas com sua sobrinha Herodias (que havia se divorciado de seu
  meio-irmão para se casar com ele) era a causa da crítica de João Batista — e indiretamente
  da decapitação.
- Conexão bíblica: Lucas 23:7–12 — o episódio de Jesus com Antipas. E Marcos 6:14–29 —
  a morte de João Batista.
- Artefato: mapa da divisão do reino de Herodes entre seus filhos, com fronteiras.

*U03 — Pôncio Pilatos:*
- Pilatos governou a Judeia de 26 a 36 d.C. — o período inteiro do ministério de João
  Batista, de Jesus, e dos primeiros anos da Igreja primitiva. Fontes romanas (Tácito) e
  judaicas (Fílon de Alexandria, Flávio Josefo) descrevem Pilatos como administrativamente
  competente, mas capaz de provocações gratuitas ao povo judeu.
- Josefo narra dois incidentes: Pilatos introduziu insígnias com a imagem do imperador
  em Jerusalém (provocação religiosa — imagens humanas eram proibidas no Templo), e
  usou recursos do Templo para construir um aqueduto. Ambos causaram protestos e repressão.
- O julgamento de Jesus é narrado nos quatro Evangelhos com variações de detalhe mas
  convergência narrativa: Pilatos não encontra culpa em Jesus, resiste brevemente, mas
  cede à pressão. João apresenta o diálogo mais elaborado — Pilatos pergunta "O que é
  a verdade?" (18:38) e não espera resposta.
- A inscrição na cruz — "Jesus Nazareno, Rei dos Judeus" em hebraico, latim e grego
  (João 19:20) — é um detalhe verossímil: Pilatos a usa para irritar os sacerdotes
  judeus, que protestam. Ele responde: "O que escrevi, escrevi" (João 19:22).
- Conexão bíblica: João 18:28–19:22 — o julgamento inteiro. Versículo-foco:
  João 19:22 — "ὃ γέγραφα γέγραφα" ("O que escrevi, escrevi") — forma do perfeito
  grego: ação concluída com efeito permanente. Um detalhe de gramática que os alunos
  do Ciclo VI entenderão plenamente.
- Artefato: fotografia da Inscrição de Pilatos (Caesarea Maritima, 1961).

**Fase de Aplicação:**
- Questão 1 (multiple_choice): Herodes, o Grande, era chamado de "rei dos judeus" mas
  o povo judaico nunca o aceitou plenamente porque... [era idumeu — não judeu de
  nascença, e governava por nomeação romana, não por linhagem davídica]
- Questão 2 (matching_pairs): Filho de Herodes → território que governou:
  Arquelaos → Judeia | Antipas → Galileia e Pereia | Filipe → territórios ao nordeste
- Questão 3 (fill_blank): A frase de Pilatos em João 19:22 ("O que escrevi, ___")
  usa o perfeito grego para indicar uma decisão irrevogável. [escrevi]

---

### H1-M04 — Judaísmo do Segundo Templo: Os Grupos que Cercavam Jesus

**ID:** H1-M04
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** 165 a.C. – 70 d.C. (período macabeu até a destruição do Templo)
**Lugares-chave:** Jerusalém (Sinédrio), Qumran (Essênios), Masada (Zelotes)

**Palavra-âncora do módulo:** νόμος (lei/Torá — o centro de cada debate entre Jesus
e os grupos religiosos)
*Justificativa:* Cada grupo definia sua identidade pela relação com o νόμος. Jesus
nunca aboliu o νόμος — mas redefiniu radicalmente quem tinha autoridade para interpretá-lo.

**Unidades:**

| Ordem | Tema | Grupo | Conexão bíblica |
|-------|------|-------|----------------|
| U01 | Fariseus: a tradição oral e a piedade popular | Fariseus | Marcos 7:1–13 — tradição dos anciãos |
| U02 | Saduceus, Sumo Sacerdote e o poder do Templo | Saduceus / Sinédrio | Marcos 11:27–33 — autoridade de Jesus |
| U03 | Essênios e Zelotes: as respostas radicais | Comunidade de Qumran / Zelotes | Lucas 6:15 — Simão, o Zelote |

**Conteúdo obrigatório por unidade:**

*U01 — Fariseus:*
- Os fariseus eram o grupo religioso mais influente na Palestina do século I — não por
  terem poder político (esse era dos saduceus), mas por terem o coração do povo. Eram
  leigos devotos, mestres da Torá, que acreditavam que a lei devia ser aplicada a cada
  aspecto da vida cotidiana.
- Eles desenvolveram a "tradição oral" — um conjunto de interpretações e aplicações
  práticas da Torá que tornassem possível vivê-la completamente. Jesus debatia com eles
  sobre essa tradição, não contra a Torá em si.
- O retrato dos fariseus nos Evangelhos é sombrio — hipócritas, formalistas, etc. —
  mas é o retrato de um conflito real, não de um grupo uniformemente mau. Paulo era
  fariseu (Filipenses 3:5). Gamaliel, o mais respeitado mestre farisaico, defende
  os apóstolos no Sinédrio (Atos 5:34–39). Nicodemos, que vai a Jesus à noite e que
  ajuda a enterrar seu corpo, era fariseu (João 3:1, 19:39).
- Os fariseus sobreviveram à destruição do Templo em 70 d.C. — o rabinismo que gerou
  o Talmude é herdeiro direto do movimento farisaico. Em certo sentido, o judaísmo
  contemporâneo descende dos fariseus.
- Conexão bíblica: Marcos 7:1–13 — o debate sobre lavar as mãos. Jesus não diz que
  lavar as mãos é errado — diz que elevar a tradição oral ao nível da Escritura é um
  problema.

*U02 — Saduceus e o poder do Templo:*
- Os saduceus eram a aristocracia sacerdotal de Jerusalém — a família do Sumo Sacerdote
  e as famílias de sacerdotes de alta classe. Controlavam o Templo, o Sinédrio e as
  finanças do culto. Politicamente, eram colaboracionistas com Roma: a estabilidade
  os beneficiava.
- Teologicamente, aceitavam apenas o Pentateuco (os cinco livros de Moisés) como
  autoritativo — o que os levava a rejeitar a ressurreição dos mortos (não mencionada
  explicitamente no Pentateuco), os anjos e a vida após a morte. Esta posição aparece
  nos debates com Jesus em Marcos 12:18–27.
- O Sumo Sacerdote no julgamento de Jesus era Caifás (18–36 d.C.), genro de Anás, o
  patriarca da família sacerdotal. Josefo menciona ambos. O julgamento de Jesus pelo
  Sinédrio era, do ponto de vista dos saduceus, uma questão de sobrevivência política:
  se o movimento messiânico crescesse demais, Roma interviria e destruiria "o lugar
  e a nação" (João 11:48 — Caifás fala isso explicitamente).
- Os saduceus desapareceram como grupo após 70 d.C. Sem Templo, sem sacerdócio, sem
  poder político — eles não tinham razão de existir.
- Conexão bíblica: João 11:47–53 — a reunião do Sinédrio após a ressurreição de Lázaro.
  Caifás diz: "é melhor que um homem morra pelo povo". João comenta que Caifás profetizou
  sem saber.

*U03 — Essênios e Zelotes: as respostas radicais:*
- Os essênios responderam à corrupção do Templo e à ocupação romana com retirada.
  A comunidade de Qumran, às margens do Mar Morto, foi descoberta em 1947 com os
  famosos Manuscritos do Mar Morto — a maior descoberta arqueológica bíblica do século XX.
  Os essênios acreditavam que o sacerdócio de Jerusalém estava corrompido e que eles
  eram o "remanescente fiel" aguardando a guerra final entre os filhos da luz e os filhos
  das trevas. João Batista pode ter tido contato com comunidades ascéticas semelhantes.
- Os zelotes responderam com resistência armada. Não eram um único grupo organizado
  no tempo de Jesus, mas o movimento cresceu ao longo do século I e culminou na Grande
  Revolta Judaica (66–73 d.C.) que destruiu Jerusalém e o Templo.
- Entre os doze apóstolos há um Simão chamado "o Zelote" (Lucas 6:15) — o que indica
  que Jesus reunia em torno de si pessoas de espectros políticos radicalmente opostos.
  Mateus era cobrador de impostos (colaboracionista romano). Simão era zelote
  (resistência ao Império). À mesa de Jesus, eles comiam juntos.
- Conexão bíblica: Lucas 6:15 — a lista dos doze. E Mateus 22:15–22 — a pergunta
  sobre o imposto ("dai a César o que é de César"). Esta pergunta foi armadilha
  montada por fariseus e herodianos (grupos opostos que se uniram contra Jesus).
- Artefato: fotografia das ruínas de Qumran com os jarros de barro onde os manuscritos
  foram encontrados.

**Fase de Aplicação (Aula do Versículo — Bloco H1):**
Versículo: *Ἐγένετο δὲ ἐν ταῖς ἡμέραις ἐκείναις...* (Lucas 2:1)

Exercício de contextualização:
1. O aluno lê Lucas 3:1–2 — a lista de seis autoridades políticas e religiosas que
   Lucas registra para datar o início do ministério de João.
2. Questão de síntese: "Lucas menciona Tibério, Pilatos, Herodes (Antipas), Filipe,
   Lisânias, Anás e Caifás. Quais desses nomes você encontrou neste bloco de módulos?
   O que essa lista diz sobre o método historiográfico de Lucas?"
3. Questão de aplicação: "Por que Jesus debatia com fariseus mas foi executado pelos
   saduceus?" [O conflito com fariseus era teológico. A ameaça para os saduceus era
   política e econômica — o Templo era o centro de ambos.]

---

## BLOCO H2 — JERUSALÉM: A CIDADE E O TEMPLO

**Versículo-troféu do bloco:** João 2:19–21 —
*ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτοῖς· λύσατε τὸν ναὸν τοῦτον καὶ ἐν τρισὶν ἡμέραις
ἐγερῶ αὐτόν.*
"Jesus respondeu e disse-lhes: Destruí este templo, e em três dias o levantarei."

**Meta do aluno ao concluir o Bloco H2:**
Conseguir imaginar Jerusalém no século I — onde ficava o Templo, o que era a entrada
pela porta Dourada, o que Jesus viu quando "olhou em derredor para tudo" (Marcos 11:11).
E entender por que a destruição do Templo em 70 d.C. foi um divisor de águas tanto para
o judaísmo quanto para o cristianismo nascente.

---

### H2-M01 — Jerusalém: Topografia, Bairros e Vida Cotidiana

**ID:** H2-M01
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** Século I d.C.
**Lugares-chave:** Monte das Oliveiras, Vale do Cedron, Cidade Alta, Cidade Baixa, Siloé

**Palavra-âncora do módulo:** ἱερόν (templo/área sagrada — distinto de ναός, o
santuário interior)
*Justificativa:* O NT usa dois termos para "templo": ἱερόν (o complexo inteiro,
incluindo os pátios) e ναός (o santuário em si). A distinção é relevante em João 2:19
e em Marcos 15:38 (o véu do ναός se rasga). Conhecer a topografia física ajuda a
entender qual espaço é qual.

**Unidades:**

| Ordem | Tema | Foco geográfico | Conexão bíblica |
|-------|------|----------------|----------------|
| U01 | A topografia de Jerusalém | Montes, vales, muros | Lucas 19:41 — Jesus chora sobre Jerusalém |
| U02 | Bairros, população e vida cotidiana | Cidade Alta vs. Baixa | João 18:1 — o jardim do Cedron |
| U03 | As portas e os acessos ao Templo | Portão Dourado, Portão de Hulda | Marcos 11:1–11 — entrada triunfal |

**Conteúdo obrigatório por unidade:**

*U01 — A topografia:*
- Jerusalém no século I ficava sobre dois morros separados pelo Vale do Tiropeon.
  O monte a nordeste — o Monte Moriá — era onde ficava o Templo, expandido por Herodes
  em uma plataforma artificial de ~144.000 m². O monte a sudoeste — a Cidade Alta —
  era o bairro aristocrático, onde provavelmente ficava a casa do Sumo Sacerdote.
- A leste, o Vale do Cedron separava a cidade do Monte das Oliveiras — o monte de onde
  Jesus fez sua entrada triunfal, onde ficava Getsêmani, e para onde ele ascendeu
  segundo Atos 1:12.
- A população de Jerusalém era de aproximadamente 40.000–80.000 pessoas em tempos
  normais — mas triplicava ou quadruplicava durante as três festas de peregrinação
  (Páscoa, Pentecostes, Tabernáculos). A semana da Páscoa com o processo, crucificação
  e ressurreição aconteceu nessa Jerusalém lotada.
- Conexão bíblica: Lucas 19:41 — "quando se aproximou e avistou a cidade, chorou por ela."
  Jesus estava descendo o Monte das Oliveiras, olhando para Jerusalém à sua frente.
  A cena física existe — arqueólogos sabem exatamente de onde ele olhou.

*U02 — Bairros e vida cotidiana:*
- A Cidade Alta (sudoeste) era habitada pela aristocracia sacerdotal e pela classe
  comerciante rica — palácio de Herodes Antipas, casa de Caifás, mansões com piscinas
  e afrescos encontradas em escavações. A Cidade Baixa (sudeste) e os subúrbios eram
  densamente habitados pela população comum.
- O Vale do Cedron, a leste, era o cemitério tradicional e rota de abastecimento.
  O jardim onde Jesus foi preso (João 18:1 — "um jardim, para onde entrou com seus
  discípulos") ficava nas encostas do Monte das Oliveiras, do lado oposto do vale.
  Era uma área de olivais que pertenciam a famílias abastadas de Jerusalém.
- A vida cotidiana era dominada pelo Templo — economicamente (câmbio, comércio de animais
  para sacrifício, emprego de sacerdotes e levitas), religiosamente (orações nas horas
  fixas, peregrinações), e politicamente (o Sinédrio se reunia no Templo).
- Conexão bíblica: João 18:1–3 — "tendo dito estas coisas, saiu Jesus com seus
  discípulos para além do ribeiro Cedron." O ribeiro era pequeno — mais um córrego
  — e o jardim ficava a uma caminhada curta do Cenáculo.

*U03 — As portas e o acesso ao Templo:*
- A plataforma do Templo tinha várias entradas. O Portão Dourado (Porta Bela) ficava
  na muralha leste, voltado para o Monte das Oliveiras — a rota natural de quem vinha
  de Betânia e Jericó (o caminho de Jesus). O Portão de Hulda ficava no sul e era o
  acesso mais movimentado para as massas.
- A entrada triunfal desceu o Monte das Oliveiras, cruzou o Vale do Cedron e entrou
  em Jerusalém provavelmente pelo Portão de Jericó ou Portão Dourado. Marcos anota
  que Jesus "entrou em Jerusalém, foi ao Templo, olhou em derredor para tudo" (11:11) —
  um detalhe de testemunha ocular.
- A cena dos cambistas: "ἱερόν" (João 2:14–15) — no pátio exterior do Templo, o
  Átrio dos Gentios, onde o comércio de animais e câmbio de moeda ocorria legitimamente
  (peregrinos precisavam trocar moedas romanas com imagem do imperador — consideradas
  impróprias — por moedas do Templo para pagar o tributo). Jesus expulsa esses
  comerciantes — do ἱερόν, não do ναός.
- Conexão bíblica: Marcos 11:1–11 e João 2:13–17.
- Artefato: mapa topográfico de Jerusalém no século I com os locais mencionados nos
  Evangelhos marcados.

**Fase de Aplicação:**
- Questão 1 (multiple_choice): O jardim onde Jesus foi preso ficava...
  [nas encostas do Monte das Oliveiras, do lado oposto do Vale do Cedron da cidade]
- Questão 2 (matching_pairs): Local → evento bíblico:
  Monte das Oliveiras → entrada triunfal e Getsêmani |
  Pátio dos Gentios (ἱερόν) → expulsão dos cambistas |
  Cidade Alta → casa do Sumo Sacerdote
- Questão 3 (fill_blank): A palavra grega para o complexo inteiro do Templo é ___,
  distinta de ___ que é o santuário interior. [ἱερόν / ναός]

---

### H2-M02 — O Templo de Herodes: Arquitetura, Funcionamento e Simbolismo

**ID:** H2-M02
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** 20 a.C. – 70 d.C. (construção e destruição)
**Lugares-chave:** Monte Moriá, Pátio dos Gentios, Pátio das Mulheres, Santo dos Santos

**Palavra-âncora do módulo:** καταπέτασμα (véu do templo — Marcos 15:38)
*Justificativa:* O καταπέτασμα que se rasgou na crucificação separava o Santo dos Santos
do restante do santuário. Saber o que era esse véu, onde ficava, e o que significava
para um judeu do século I, transforma a cena de Marcos 15:38 de detalhe narrativo em
proclamação teológica.

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | A construção: escala e engenharia | Plataforma, pórticos, pedras | Marcos 13:1 — "que pedras!" |
| U02 | Os pátios: quem podia ir onde | Gentios, Mulheres, Israel, Sacerdotes | Atos 21:28 — Paulo acusado de profanar |
| U03 | O Santo dos Santos e o véu | ναός, o Lugar Santíssimo | Marcos 15:38 — o véu se rasga |

**Conteúdo obrigatório por unidade:**

*U01 — Escala e engenharia:*
- Herodes construiu uma plataforma artificial sobre o Monte Moriá, com muros de
  sustentação de até 45 metros de altura. As pedras do muro ocidental (o atual
  Muro das Lamentações) pesam entre 2 e 600 toneladas. Uma delas tem 13,6 metros
  de comprimento — o maior bloco de construção do mundo antigo fora do Egito.
- O complexo inteiro cobria ~144.000 m² — equivalente a 20 campos de futebol.
  Os pórticos externos tinham colunas de mármore branco de 11,5 metros de altura,
  entalhadas em peça única. Flávio Josefo, que viu o Templo antes de sua destruição,
  escreve que parecia "uma montanha coberta de neve" do exterior.
- A construção começou ~20 a.C. e nunca foi totalmente concluída — trabalhadores
  ainda aparafusavam pedras quando foi destruído em 70 d.C. João 2:20 registra que
  os judeus disseram a Jesus: "46 anos para construir este templo, e tu o levantas
  em três dias?" — um detalhe cronológico preciso que confirma a datação histórica.
- Conexão bíblica: Marcos 13:1 — os discípulos saem do Templo e dizem: "Mestre, olha!
  Que pedras e que edifícios!" Jesus responde que tudo será demolido. Em 70 d.C., o
  general Tito cumpriu a profecia: o Templo foi destruído pedra por pedra.
- Artefato: reconstrução 3D do Templo de Herodes (baseada em Josefo e escavações).

*U02 — Os pátios e quem podia ir onde:*
- O Templo era uma série de pátios concêntricos com acesso progressivamente restrito.
  O Átrio dos Gentios (exterior): qualquer pessoa podia entrar — judeus, gentios,
  mulheres, homens. Era aqui o comércio e o câmbio.
  O Pátio das Mulheres: somente judeus — homens e mulheres. Tinha os cofres do Templo
  onde a viúva pobre depositou suas duas moedas (Marcos 12:41–44).
  O Pátio de Israel: somente homens judeus.
  O Pátio dos Sacerdotes: somente sacerdotes.
  O Santuário (ναός): somente o Sumo Sacerdote, uma vez por ano, no Yom Kippur.
- Uma inscrição de pedra encontrada em 1871 (e outra fragmento em 1935), hoje nos
  museus de Istambul e Israel, proibia gentios de entrar além do Átrio sob pena de
  morte. Era uma das raras execuções que Roma permitia aos judeus realizarem sem
  aprovação romana.
- Conexão bíblica: Atos 21:27–29 — Paulo é acusado de ter levado o gentio Trófimo
  além do limite do Átrio. A multidão tenta linchar Paulo. A inscrição encontrada em
  1871 é o objeto referenciado nessa passagem.
- Artefato: fotografia da inscrição proibindo gentios, com tradução.

*U03 — O Santo dos Santos e o véu:*
- O ναός (santuário) era dividido em dois cômodos: o Lugar Santo (com o altar de
  incenso, a menorá, a mesa dos pães da proposição) e o Lugar Santíssimo (Santo dos
  Santos), separados pelo καταπέτασμα — o véu.
- O véu tinha ~18 metros de altura, era feito de linho, lã azul, púrpura e escarlate,
  e representava os céus separando Deus da criação. O Sumo Sacerdote passava por ele
  uma vez por ano, no Dia da Expiação, carregando o sangue do sacrifício.
- Marcos 15:38 registra que no momento da morte de Jesus o véu "se rasgou em dois,
  de cima abaixo." A direção importa: de cima — não foi derrubado pelo terremoto, foi
  rasgado de dentro. O autor da Epístola aos Hebreus desenvolve o simbolismo em
  detalhe (Hebreus 10:19–20): o véu rasgado é o caminho aberto à presença de Deus
  pelo corpo de Cristo.
- Conexão bíblica: Marcos 15:38 e Hebreus 10:19–22.
- Artefato: diagrama do ναός com as divisões internas e localização do véu.

**Fase de Aplicação:**
- Questão 1 (multiple_choice): O "Templo" em João 2:14 (ἱερόν) refere-se a...
  [todo o complexo, incluindo o Pátio dos Gentios — onde os cambistas estavam]
- Questão 2 (matching_pairs): Espaço → quem tinha acesso:
  Átrio dos Gentios → qualquer pessoa |
  Pátio das Mulheres → judeus de ambos os sexos |
  Pátio dos Sacerdotes → somente sacerdotes
- Questão 3 (fill_blank): O καταπέτασμα que se rasgou em Marcos 15:38 era o ___
  que separava o Lugar Santo do Santo dos Santos. [véu]

---

### H2-M03 — A Semana da Páscoa: O Que Estava Acontecendo na Cidade

**ID:** H2-M03
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** A semana de 14–21 Nisan, ~30 d.C.
**Lugares-chave:** Betânia, Getsêmani, Pretório, Gólgota

**Palavra-âncora do módulo:** πάσχα (páscoa — a festa que moldou cada detalhe
da última semana de Jesus)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | O que era a Páscoa no século I | Ritual, escala, significado | João 18:28 — não se contaminar antes da Páscoa |
| U02 — | A cronologia da semana santa | Domingo a domingo | Marcos 11–16 — estrutura narrativa |
| U03 | Crucificação: o método romano | Processo legal e execução | João 19:16–30 |

**Conteúdo obrigatório por unidade:**

*U01 — A Páscoa no século I:*
- A Páscoa (Pessach) era a maior das três festas de peregrinação. Judeus de toda
  a diáspora tentavam ir a Jerusalém pelo menos uma vez na vida para celebrá-la.
  A população da cidade multiplicava por 4–5 durante a semana — talvez 200.000–300.000
  pessoas em uma cidade de ~60.000. Flávio Josefo menciona 256.500 cordeiros sacrificados
  em uma única Páscoa — número provavelmente exagerado, mas indicativo da escala.
- O ritual central era o sacrifício do cordeiro pascal na tarde de 14 Nisan e o
  banquete familiar (Seder) naquela noite. A Última Ceia foi esse banquete pascal —
  ou na véspera dele, dependendo da cronologia sinótica vs. joanina.
- O ambiente político durante a Páscoa era de máxima tensão. A festa comemorava a
  libertação da escravidão no Egito — e em uma Jerusalém ocupada por Roma, esse
  simbolismo era inflamável. O governador romano vinha pessoalmente de Cesareia a
  Jerusalém com tropas extras durante as festas.
- Conexão bíblica: João 18:28 — os sacerdotes que levaram Jesus ao pretório "não
  entraram no palácio para não se contaminarem e poderem comer a Páscoa." Ironia
  joanina: estavam preocupados com pureza ritual enquanto executavam uma injustiça.

*U02 — A cronologia da semana:*
- A sequência narrativa dos Evangelhos sinóticos cobre aproximadamente 7 dias:
  Domingo — entrada triunfal (Marcos 11:1–11)
  Segunda — maldição da figueira, expulsão dos cambistas (Marcos 11:12–19)
  Terça — debates no Templo, discurso escatológico (Marcos 11:20–13:37)
  Quarta — silêncio narrativo; unção em Betânia (Marcos 14:3–9)
  Quinta — preparação da Páscoa, Última Ceia, Getsêmani, prisão (Marcos 14:12–52)
  Sexta — julgamentos, crucificação, morte, sepultamento (Marcos 14:53–15:47)
  Sábado — silêncio narrativo; Jesus na tumba
  Domingo — ressurreição (Marcos 16:1–8)
- A compressão temporal nos Evangelhos é real — cada dia dessa semana recebe mais
  espaço narrativo do que os três anos anteriores do ministério de Jesus em alguns
  Evangelhos.
- Conexão bíblica: a estrutura inteira de Marcos 11–16. O aluno que conhece essa
  sequência pode navegar os quatro relatos da Paixão com mais clareza.

*U03 — Crucificação: o método romano:*
- A crucificação era uma execução romana reservada para escravos, rebeldes e inimigos
  do Estado — não para cidadãos romanos. Era punição de máxima desumanização: pública,
  lenta, e projetada para destruir a dignidade do condenado junto com sua vida.
- O processo: flagelação (com o flagrum — fios de couro com pedaços de osso e chumbo),
  carregamento do patibulum (a viga horizontal), fixação no stipes (poste vertical)
  já cravado no chão. A morte podia demorar dias — acelerada quando necessário pelo
  crurifragium (quebrar as pernas), que impedia o condenado de se sustentar e causava
  asfixia rápida. No caso de Jesus, não foi necessário (João 19:33).
- A inscrição titulus (João 19:19–20 — em hebraico, latim e grego) era prática comum —
  anunciava o crime. A Gólgota (Calvário) ficava fora dos muros da cidade, em um local
  visível de estradas — a visibilidade era parte da punição.
- Conexão bíblica: João 19:16–37 — o relato joanino com os detalhes de testemunha
  (19:35: "o que viu testificou"). A lança que perfurou o lado (19:34) e a saída de
  sangue e água eram sinais de morte confirmada para um médico do século I.

**Fase de Aplicação (Aula do Versículo — Bloco H2):**
Versículo: *λύσατε τὸν ναὸν τοῦτον καὶ ἐν τρισὶν ἡμέραις ἐγερῶ αὐτόν.* (João 2:19)

1. Análise contextual: Jesus está no ἱερόν (pátio dos Gentios) após expulsar os
   cambistas. Os judeus pedem um sinal de autoridade. Jesus diz: destruí este ναός.
2. O equívoco deliberado: os interlocutores entendem "este edifício de pedra". João
   esclarece no versículo 21: "ele falava do templo do seu corpo."
3. Questão de síntese: "Depois de aprender sobre o Templo de Herodes — sua escala,
   seus 46 anos de construção, seu status como o maior complexo religioso do
   Mediterrâneo — o que a afirmação de Jesus soou para quem a ouviu? E o que ela
   soa para o leitor que conhece o final?"

---

### H2-M04 — Cafarnaum, Galileia e os Caminhos de Jesus

**ID:** H2-M04
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** ~26–30 d.C. (ministério galileu de Jesus)
**Lugares-chave:** Mar de Galileia, Cafarnaum, Nazaré, Monte das Bem-aventuranças

**Palavra-âncora do módulo:** γῆ (terra — especificamente "a terra da Galileia dos
Gentios", Mateus 4:15, citando Isaías 9:1)
*Justificativa:* Galileia era considerada pelos judeus do sul uma região inferior —
misturada, de fronteira, pouco ortodoxa. Jesus escolheu começar seu ministério lá.

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Galileia: a região e seu estigma | Geografia e percepção cultural | João 1:46 — "algo bom pode vir de Nazaré?" |
| U02 | Cafarnaum: a base de operações | Arqueologia da sinagoga e da cidade | Marcos 1:21–34 — um dia em Cafarnaum |
| U03 | As rotas de Jesus: Galileia a Jerusalém | A estrada de Jericó e as travessias | Lucas 10:30 — o bom samaritano |

**Conteúdo obrigatório por unidade:**

*U01 — Galileia:*
- A Galileia era uma região de fronteira no norte da Palestina, separada da Judeia
  pela Samaria. Historicamente, o Reino do Norte havia sido conquistado pela Assíria
  em 722 a.C. e repopulado com povos de várias origens — daí a mistura étnica e
  religiosa que a tornava suspeita para os judeus do sul. "Galileia dos Gentios"
  era uma designação depreciativa.
- O Mar de Galileia (Lago Quinerete) é um lago de água doce de ~21 km × 13 km, a
  ~210 metros abaixo do nível do mar. A pesca era a principal indústria — Pedro, André,
  Tiago e João eram pescadores comerciais, não pescadores de subsistência. O barco
  encontrado em 1986, enterrado no lodo às margens do lago e datado do século I, dá
  uma ideia concreta do tipo de embarcação que Jesus e seus discípulos usavam.
- Conexão bíblica: João 1:46 — Natanael diz: "pode algo bom vir de Nazaré?" — a
  atitude de um judeu do sul em relação à Galileia. E Mateus 4:15–16 cita Isaías
  para enquadrar o início do ministério galileu de Jesus como cumprimento de profecia.

*U02 — Cafarnaum:*
- Cafarnaum era uma cidade de pescadores às margens do lago, na rota comercial
  que ligava a Síria ao Mediterrâneo. Jesus escolheu Cafarnaum como base de operações
  após deixar Nazaré (Mateus 4:13). A casa de Pedro ficava em Cafarnaum — escavações
  revelaram uma estrutura que foi transformada em casa-igreja nos primeiros séculos,
  com grafites em aramaico, grego e siriano invocando "Pedro" e "Jesus".
- A sinagoga de Cafarnaum: a estrutura de pedra branca que os turistas veem hoje é do
  século IV, mas suas fundações são de pedra basáltica do século I — provavelmente a
  sinagoga onde Jesus ensinou em Marcos 1:21 e João 6:59.
- Marcos 1:21–34 descreve "um dia em Cafarnaum" que começa na sinagoga (ensino e
  exorcismo), vai para a casa de Pedro (cura da sogra), e termina com uma cidade inteira
  à porta da casa ao entardecer. Esta é uma das cenas mais vívidas dos Evangelhos —
  e arqueologicamente temos o lugar.
- Conexão bíblica: Marcos 1:21–34.
- Artefato: fotografia da casa de Pedro com as escavações e a estrutura da igreja octogonal
  do século V construída sobre ela.

*U03 — As rotas de Jesus:*
- A principal rota de Galileia a Jerusalém passava pela Samaria (rota direta) ou
  contornava pelo vale do Jordão, passando por Jericó (rota mais longa, preferida por
  peregrinos que queriam evitar os samaritanos). A distância de Cafarnaum a Jerusalém
  é ~170 km — cerca de 4 dias de caminhada. Jesus fez essa jornada múltiplas vezes.
- A estrada de Jerusalém a Jericó desce ~1.000 metros em ~27 km — uma descida íngreme
  pelo deserto da Judeia, conhecida por ser perigosa. O bom samaritano de Lucas 10 é
  situado nessa estrada específica, que todo ouvinte de Jesus conhecia.
- Betânia ficava a ~3 km a leste de Jerusalém, no lado oposto do Monte das Oliveiras —
  a aldeia de Maria, Marta e Lázaro, onde Jesus se hospedava durante a semana da Páscoa.
  A distância era uma caminhada de ~45 minutos.
- Conexão bíblica: Lucas 10:30 — "um homem descia de Jerusalém a Jericó." Não uma
  estrada imaginária — a estrada existe, a descida existe, o perigo era real.
- Artefato: mapa das principais rotas de Jesus com distâncias e tempos estimados de
  caminhada.

---

## BLOCO H3 — OS ESCRITORES E OS TEXTOS

**Versículo-troféu do bloco:** 2 Timóteo 3:16 —
*πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν...*
"Toda Escritura é inspirada por Deus e útil para o ensino..."

**Meta do aluno ao concluir o Bloco H3:**
Conhecer quem escreveu os principais livros do NT, em que contexto, para quais comunidades,
e por que a datação e autoria dessas obras importam para sua interpretação.

---

### H3-M01 — Paulo: De Tarso a Roma — Vida, Viagens e Contexto das Cartas

**ID:** H3-M01
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** ~5 d.C. – ~67 d.C.
**Lugares-chave:** Tarso, Damasco, Antioquia, Corinto, Éfeso, Roma

**Palavra-âncora do módulo:** χάρις (graça — a palavra que Paulo usa ~100× em suas
cartas; a teologia da graça é inseparável da biografia de Paulo)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Quem era Paulo antes de Damasco | Tarso, formação farisaica, perseguição | Filipenses 3:4–6 — o currículo de Paulo |
| U02 | As três viagens missionárias | Rotas, igrejas, conflitos | Atos 13–21 — panorama |
| U03 | As cartas: quando, de onde, para quem | Datação e contexto de cada carta | 1 Coríntios 1:2 — "a igreja de Deus em Corinto" |

**Conteúdo obrigatório por unidade:**

*U01 — Paulo antes de Damasco:*
- Paulo nasceu em Tarso (atual Turquia) — cidade universitária, capital da Cilícia,
  de cultura greco-romana. Era cidadão romano de nascença e judeu da diáspora de
  família farisaica. Foi enviado a Jerusalém para estudar com Gamaliel (Atos 22:3) —
  o mais respeitado mestre farisaico de sua geração.
- Era, segundo seu próprio testemunho em Filipenses 3:5–6, "quanto à lei, fariseu;
  quanto ao zelo, perseguidor da Igreja; quanto à justiça que está na lei, irrepreensível."
  Ele não era um fariseu mediocre que nunca viveu a lei — era um zelote da tradição
  que perseguia a nova seita com convicção.
- A conversão na estrada de Damasco (Atos 9) é narrada três vezes em Atos — e Paulo
  a menciona em Gálatas 1 e 1 Coríntios 15. A experiência reestruturou completamente
  sua teologia: o perseguidor tornou-se o perseguido, o defensor da exclusividade
  judaica tornou-se o apóstolo dos gentios.
- Conexão bíblica: Filipenses 3:4–11 — Paulo lista seus "ganhos" e os chama de "lixo"
  (σκύβαλα) comparados a Cristo. Esta é uma de suas frases mais radicais.

*U02 — As três viagens missionárias:*
- Primeira viagem (~46–48 d.C.): Antioquia → Chipre → Ásia Menor (Icônio, Listra,
  Derbe). Fundação das primeiras igrejas gentias.
- Segunda viagem (~49–52 d.C.): Ásia Menor → Macedônia (Filipos, Tessalônica, Bereia)
  → Grécia (Atenas, Corinto, 18 meses). As cartas aos Tessalonicenses são as mais
  antigas do NT, escritas durante ou logo após esta viagem.
- Terceira viagem (~53–57 d.C.): Éfeso (3 anos), Macedônia, Corinto. As grandes cartas
  — 1 e 2 Coríntios, Gálatas, Romanos — são escritas durante ou ao final desta viagem.
- O mapa das viagens de Paulo é quase idêntico ao mapa das estradas romanas e das
  rotas comerciais — ele seguia as artérias do Império, plantando igrejas em cidades
  estratégicas.
- Conexão bíblica: Atos 13–21 — a narrativa de Lucas das viagens. Atos 16:9 — a visão
  do macedônio: "vem à Macedônia e ajuda-nos." Paulo obedece — e as igrejas europeias
  começam ali.

*U03 — As cartas: quando, de onde, para quem:*
- Paulo escreveu 13 cartas que o NT atribui a ele (7 são universalmente aceitas como
  paulinas pela academia: Romanos, 1–2 Coríntios, Gálatas, Filipenses, 1 Tessalonicenses,
  Filêmon). As cartas não são tratados teológicos abstratos — são respostas a situações
  concretas de igrejas reais.

| Carta | Data aprox. | De onde | Para quê |
|-------|-------------|---------|---------|
| 1 Tessalonicenses | ~50 d.C. | Corinto | Consolo após mortes; expectativa da volta de Cristo |
| Gálatas | ~48–55 d.C. | Síria ou Éfeso | Resposta à crise da circuncisão |
| 1 Coríntios | ~55 d.C. | Éfeso | Divisões, imoralidade, questões práticas |
| Romanos | ~57 d.C. | Corinto | Carta programática antes de ir a Roma e Espanha |
| Filipenses | ~60–62 d.C. | Roma (prisão) | Carta de amor a uma comunidade querida |
| Filêmon | ~60 d.C. | Roma (prisão) | Um escravo fugitivo (Onésimo) devolvido convertido |

- Conexão bíblica: 1 Coríntios 1:2 — "à igreja de Deus que está em Corinto." A carta
  começa localizando sua audiência. Corinto era uma cidade portuária de 200.000–500.000
  habitantes, cosmopolita, conhecida por imoralidade e pluralismo religioso. O contexto
  explica por que Paulo fala do que fala.

**Fase de Aplicação:**
- Questão 1 (multiple_choice): Por que Paulo era um evangelista eficaz em todo o
  Mediterrâneo? [combinação única: judeu formado em Jerusalém + cidadão romano +
  falante nativo de grego + conhecimento das estradas romanas]
- Questão 2 (matching_pairs): Carta → situação que gerou:
  1 Tessalonicenses → mortos na comunidade e espera da volta de Cristo |
  Gálatas → crise sobre a necessidade de circuncisão |
  Filêmon → escravo convertido sendo devolvido ao dono
- Questão 3 (fill_blank): A palavra χάρις, central na teologia de Paulo, é especialmente
  significativa na sua biografia porque Paulo ___ a Igreja antes de receber graça.
  [perseguia]

---

### H3-M02 — João: Éfeso, a Comunidade Joanina e o Evangelho do Amor

**ID:** H3-M02
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** ~50–100 d.C.
**Lugares-chave:** Éfeso, Patmos, Palestina

**Palavra-âncora do módulo:** ἀγάπη — a palavra central do corpus joanino e do
versículo-troféu do Ciclo II. Aqui o aluno aprende a comunidade que a cultivou.

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | João filho de Zebedeu: da Galileia a Éfeso | Trajetória histórica | João 19:26–27 — "toma tua mãe" |
| U02 | O Evangelho de João: diferenças e teologia | Por que João é diferente | João 1:1 — o Prólogo |
| U03 | O Apocalipse: Patmos, as sete igrejas, o contexto | Perseguição de Domiciano | Apocalipse 1:9 — "eu João, vosso irmão" |

**Conteúdo obrigatório por unidade:**

*U01 — João em Éfeso:*
- A tradição antiga (Ireneu, Eusébio) registra que João, o apóstolo, viveu em Éfeso
  até idade avançada (~95–100 d.C.) e que Maria, a mãe de Jesus, foi com ele (baseado
  em João 19:27 — "toma tua mãe"). Éfeso era a maior cidade da Ásia Menor — capital
  da província, centro comercial e cultural, lar do Templo de Ártemis (uma das sete
  maravilhas do mundo antigo).
- A "comunidade joanina" é o nome que os estudiosos dão ao grupo de igrejas em torno
  de João — que produziu não só o Evangelho de João, mas também as três cartas de João
  e, segundo muitos, o Apocalipse. Essa comunidade tinha características teológicas
  distintas: ênfase no amor, na permanência ("abide/permaneça"), na identidade de
  Cristo como Logos pré-existente.
- Conexão bíblica: João 19:26–27 — no momento da crucificação, Jesus entrega sua
  mãe ao discípulo amado (identificado pela tradição como João). Este ato de cuidado
  é o único mencionado nos momentos finais joaninos.

*U02 — O Evangelho de João:*
- João é radicalmente diferente dos sinóticos (Mateus, Marcos, Lucas). Não há parábolas
  (as histórias mais famosas de Jesus — o filho pródigo, o bom samaritano — são todas
  dos sinóticos). Em vez disso, João tem longos discursos de Jesus e sete "sinais"
  (milagres escolhidos com cuidado teológico).
- O Prólogo (João 1:1–18) é único no NT — uma abertura filosófico-poética que situa
  Jesus na eternidade antes da criação. Nenhum outro Evangelho começa assim. João está
  escrevendo para uma audiência que conhece tanto o judaísmo quanto o pensamento
  helenístico — o conceito de Logos (razão criativa) vinha da filosofia grega.
- João 20:31 revela o propósito explícito do Evangelho: "estas coisas foram escritas
  para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais
  vida em seu nome." É um Evangelho com tese declarada.
- Conexão bíblica: João 1:1–18 — o Prólogo que o aluno começou a decifrar no Ciclo I
  do grego.

*U03 — O Apocalipse e Patmos:*
- O Apocalipse de João foi escrito em Patmos — uma pequena ilha no Mar Egeu a ~60 km
  de Éfeso, usada pelos romanos como local de exílio. João declara estar lá "por causa
  da palavra de Deus e do testemunho de Jesus" (Apocalipse 1:9) — ou seja, por perseguição.
- O contexto é o reinado de Domiciano (~81–96 d.C.), que exigiu adoração imperial com
  mais agressividade do que seus predecessores. As sete igrejas destinatárias do Apocalipse
  (Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia, Laodiceia) eram todas na Ásia
  Menor, na rota postal que circulava a região.
- O Apocalipse é literatura de resistência — escrita em linguagem codificada (a "Babilônia"
  é Roma; as bestas são figuras imperiais) para encorajar comunidades perseguidas. Não
  era para ser lido como mapa do futuro, mas como carta pastoral para o presente daquelas
  igrejas.
- Conexão bíblica: Apocalipse 1:9 e os capítulos 2–3 (as cartas às sete igrejas) —
  cada carta conhece a situação específica daquela comunidade com precisão.

---

### H3-M03 — Lucas e Atos: O Médico, o Historiador e a Expansão da Igreja

**ID:** H3-M03
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** ~60–85 d.C.
**Lugares-chave:** Antioquia, Roma, a diáspora

**Palavra-âncora do módulo:** διήγησις (narrativa — a palavra que Lucas usa em
seu prólogo para descrever o que está escrevendo: "uma narrativa ordenada", Lucas 1:1)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Quem era Lucas e por que ele é único | Único autor gentio do NT | Lucas 1:1–4 — o prólogo histórico |
| U02 | Lucas–Atos como obra em dois volumes | Estrutura e tese narrativa | Atos 1:1–2 — "no primeiro livro" |
| U03 | Atos: a expansão de Jerusalém a Roma | Estrutura geográfica de Atos 1:8 | Atos 1:8 — "até os confins da terra" |

**Conteúdo obrigatório por unidade:**

*U01 — Quem era Lucas:*
- Lucas é identificado por Paulo em Colossenses 4:14 como "o médico amado" — único
  autor gentio identificado no NT. Seu grego é o mais literário do NT — próximo do
  grego clássico em sua precisão vocabular.
- O prólogo de Lucas (1:1–4) é modelado nos prólogos de historiadores gregos como
  Tucídides e Políbio: declaração de método ("investigei tudo cuidadosamente desde
  o início"), audiência específica ("Teófilo"), e propósito ("para que saibas a
  firmeza das coisas que te foram ensinadas"). Lucas não está escrevendo hagiografia —
  está escrevendo história.
- Lucas menciona que "muitos" já haviam escrito narrativas (1:1) — uma referência
  provavelmente a Marcos e outras fontes. Ele as usa e adiciona material próprio
  (especialmente de fontes femininas — a anunciação a Maria, a visitação a Isabel,
  os episódios das mulheres no ministério de Jesus).
- Conexão bíblica: Lucas 1:1–4 — o prólogo mais explicito metodologicamente de
  qualquer Evangelho.

*U02 — Lucas–Atos como obra dupla:*
- Lucas e Atos são dois volumes de uma única obra. Atos 1:1 ("no primeiro livro,
  ó Teófilo, tratei de tudo o que Jesus começou a fazer e a ensinar") confirma que
  o autor vê os dois volumes como continuação. Juntos, Lucas e Atos perfazem ~28%
  do NT — mais do que qualquer outro autor único.
- A tese narrativa: o Espírito que desceu sobre Jesus em seu batismo (Lucas 3:22) é
  o mesmo que desce sobre os discípulos em Pentecostes (Atos 2) e continua movendo
  a história. Lucas–Atos é a história de como a proclamação de Jesus em Nazaré
  ("o Espírito do Senhor está sobre mim" — Lucas 4:18, citando Isaías 61) se expande
  de Jerusalém a Roma.
- Conexão bíblica: Lucas 4:18–21 — Jesus lê Isaías na sinagoga de Nazaré e diz:
  "hoje se cumpriu esta Escritura." Atos termina em Roma com Paulo pregando "sem
  impedimento" (Atos 28:31). A expansão foi realizada.

*U03 — A estrutura geográfica de Atos:*
- Atos 1:8 fornece o índice geográfico da obra: "sereis minhas testemunhas em
  Jerusalém, em toda a Judeia e Samaria, e até os confins da terra." Os capítulos
  de Atos seguem essa progressão exatamente.
  - Caps 1–7: Jerusalém
  - Caps 8–12: Judeia, Samaria, Antioquia
  - Caps 13–28: mundo mediterrâneo até Roma
- Roma era literalmente o fim do mundo para um judeu da Palestina — o centro do
  Império, onde o Evangelho chegaria por meio de Paulo preso, mas pregando livremente.
- Conexão bíblica: Atos 28:30–31 — o final deliberadamente aberto de Atos. Paulo
  está em Roma, preso mas acessível, "pregando o Reino de Deus e ensinando as coisas
  referentes ao Senhor Jesus Cristo com toda a ousadia, sem impedimento."

---

### H3-M04 — Marcos, Mateus e o Problema Sinótico

**ID:** H3-M04
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** ~65–90 d.C.
**Lugares-chave:** Roma (Marcos), Antioquia/Síria (Mateus)

**Palavra-âncora do módulo:** εὐαγγέλιον (evangelho — a palavra que Marcos usa
para nomear seu gênero literário inteiramente novo: "o início do evangelho de Jesus
Cristo", Marcos 1:1)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Marcos: o mais antigo, o mais urgente | Origem romana, Pedro como fonte | Marcos 1:1 — o começo |
| U02 | Mateus: o Evangelho da Igreja | Origem síria, audiência judaica | Mateus 5:17 — "não vim revogar" |
| U03 | O problema sinótico: por que três são parecidos? | Hipótese das duas fontes | Marcos 4:35–41 e paralelos |

**Conteúdo obrigatório por unidade:**

*U01 — Marcos:*
- Marcos é provavelmente o mais antigo dos Evangelhos (~65–70 d.C.) e a principal
  fonte de Mateus e Lucas. É o mais curto, o mais urgente (usa "imediatamente" —
  εὐθύς — 41 vezes), e o mais cru literariamente. A tradição antiga (Papias, ~120 d.C.)
  diz que Marcos "escreveu com exatidão, mas não em ordem, as coisas ditas e feitas
  pelo Senhor" baseado nas pregações de Pedro em Roma.
- Marcos é escrito para uma audiência gentio-romana — ele explica os costumes judaicos
  (Marcos 7:3–4), traduz palavras aramaicas (Marcos 5:41, 7:34, 15:34), e tem um ritmo
  narrativo de ação que combina com o gosto literário romano.
- A teoria mais aceita: Marcos foi escrito em Roma durante ou logo após o martírio de
  Pedro (~64–65 d.C.) para preservar a pregação petrina para as comunidades romanas.
- Conexão bíblica: Marcos 1:1 — "Princípio do evangelho de Jesus Cristo, Filho de Deus."
  Sem genealogia, sem nascimento, sem Prólogo filosófico — começa no meio da ação com
  João Batista no deserto.

*U02 — Mateus:*
- Mateus (~80–90 d.C.) usa ~90% do material de Marcos, mas o reorganiza e amplia.
  É o mais estruturado dos Evangelhos — cinco grandes discursos (Sermão do Monte cap.5–7,
  Instrução Missionária cap.10, Parábolas cap.13, Instrução Eclesiástica cap.18,
  Discurso Escatológico cap.24–25), possivelmente ecoando os cinco livros de Moisés.
- Mateus escreve para uma audiência judaica ou judeu-cristã — tem mais citações do AT
  do que qualquer outro Evangelho, e frequentemente usa a fórmula "para que se cumprisse
  o que foi dito pelo profeta..." A frase "Reino dos Céus" (em vez de "Reino de Deus"
  dos outros Evangelhos) reflete a reverência judaica em não pronunciar o nome divino.
- Conexão bíblica: Mateus 5:17 — "não penseis que vim revogar a Lei ou os Profetas;
  não vim revogar, mas cumprir." Esta afirmação, central para a audiência judaica de
  Mateus, define o ministério de Jesus em relação ao AT.

*U03 — O problema sinótico:*
- "Sinótico" vem do grego σύνοψις (visão de conjunto) — Mateus, Marcos e Lucas são
  chamados sinóticos porque podem ser lidos em colunas paralelas, revelando semelhanças
  e diferenças. A questão: como explicar a sobreposição de ~90% de Marcos em Mateus,
  e ~60% em Lucas, ao mesmo tempo que Mateus e Lucas compartilham material que não
  está em Marcos?
- A solução mais aceita (Hipótese das Duas Fontes): Mateus e Lucas usaram dois documentos
  independentes: Marcos (para as narrativas) e uma coleção de ditos de Jesus chamada Q
  (de Quelle, "fonte" em alemão — nunca encontrada, reconstruída por dedução). Material
  próprio de Mateus é chamado M, próprio de Lucas é chamado L.
- Isso não é ameaça à inspiração — é arqueologia literária. Entender as fontes ajuda a
  entender por que Lucas, por exemplo, inclui parábolas que Marcos não tem (o filho
  pródigo, o bom samaritano), e por que Mateus organiza o material de forma diferente.
- Conexão bíblica: Marcos 4:35–41 (tempestade acalmada) lido ao lado de Mateus 8:23–27
  e Lucas 8:22–25 — mesmo evento, perspectivas diferentes. Observar o que cada um inclui,
  omite e enfatiza.

---

## BLOCO H4 — COMO O NT CHEGOU ATÉ VOCÊ

**Versículo-troféu do bloco:** 2 Pedro 1:21 —
*οὐ γὰρ θελήματι ἀνθρώπου ἠνέχθη ποτε προφητεία, ἀλλὰ ὑπὸ πνεύματος ἁγίου
φερόμενοι ἐλάλησαν ἀπὸ θεοῦ ἄνθρωποι.*
"pois nunca qualquer profecia foi dada por vontade humana, mas homens falaram da parte
de Deus movidos pelo Espírito Santo."

**Meta do aluno ao concluir o Bloco H4:**
Entender como um texto escrito no século I em papiro chegou até sua Bíblia em português —
passando por copistas, cânon, manuscritos, tradução. E ter uma compreensão básica de
por que existem variantes textuais e por que isso não ameaça a confiabilidade do NT.

---

### H4-M01 — Do Papiro ao Códice: Como os Textos Eram Escritos e Copiados

**ID:** H4-M01
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** Século I–IV d.C.
**Lugares-chave:** Alexandria, Cesareia, Roma

**Palavra-âncora do módulo:** γραφή (escrita/Escritura — a mesma palavra que Paulo
usa em 2 Timóteo 3:16 para descrever os textos sagrados)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Materiais de escrita no século I | Papiro, pergaminho, tinta, escribas | 2 João 12 — "não quis escrever com papel" |
| U02 | A transição do rolo ao códice | Por que os cristãos adotaram o códice | 2 Timóteo 4:13 — "os livros e os pergaminhos" |
| U03 | A cópia dos manuscritos | Scriptoria, variantes textuais, tradição | João 21:25 — "o mundo não comportaria os livros" |

**Conteúdo obrigatório por unidade:**

*U01 — Materiais de escrita:*
- O papiro era o suporte primário para documentos no mundo mediterrâneo — feito das
  camadas do caule da planta Cyperus papyrus, cultivada principalmente no Egito. Uma
  folha de papiro era relativamente barata, mas frágil ao umidade. Daí a extraordinária
  preservação dos manuscritos do NT encontrados no Egito (clima seco) vs. a ausência
  de originais da Europa (clima úmido).
- As cartas de Paulo eram escritas em papiro e enviadas por portadores pessoais.
  O Papiro P46 (~200 d.C.), encontrado no Egito, contém 10 cartas de Paulo — é um
  dos manuscritos mais importantes do NT.
- Escribas profissionais (ἀμανουένσεις) eram frequentemente usados como ditadores.
  Romanos 16:22 menciona Tércio: "eu, Tércio, que escrevi esta carta, vos saúdo."
  Paulo ditou; Tércio escreveu.
- Conexão bíblica: 2 João 12 — "tendo muito que vos escrever, não quis fazê-lo por
  papel e tinta" — χάρτης (papel de papiro) e μέλαν (tinta). O vocabulário cotidiano
  da comunicação no século I.

*U02 — Do rolo ao códice:*
- Os judeus e o mundo greco-romano usavam rolos (volumen/βιβλίον) — fitas longas
  enroladas em torno de um bastão. O códice (folhas dobradas e costuradas — precursor
  do livro moderno) era usado para rascunhos e notas pessoais.
- Os cristãos, de forma surpreendente e precoce (~século II), adotaram o formato
  códice para seus textos sagrados — enquanto judeus e outros continuavam com rolos.
  A razão provável: o códice permitia reunir múltiplos textos num único volume (os
  quatro Evangelhos, as cartas de Paulo), era mais fácil de transportar e de encontrar
  passagens específicas.
- Isso significa que o formato do seu NT — um livro com páginas — é uma invenção
  cristã primitiva, não romana ou judaica.
- Conexão bíblica: 2 Timóteo 4:13 — "traze o capote que deixei em Trôade, com
  Carpo, e os livros (βιβλία), especialmente os pergaminhos (μεμβράνας)." Paulo
  distingue dois suportes — papiro (βιβλία) e pergaminho (μεμβράνας, feito de pele
  de animal, mais durável e caro).

*U03 — A cópia dos manuscritos:*
- Antes da imprensa (1450), cada cópia do NT era feita à mão. As cópias eram feitas
  em scriptoria monásticos ou por copistas particulares — às vezes ditadas a grupos
  de copistas (o que introduzia erros auditivos), às vezes copiadas visualmente
  (que introduzia erros visuais: letras parecidas trocadas).
- Resultado: temos mais de 5.800 manuscritos gregos do NT (mais do que qualquer
  outra obra da Antiguidade — Homero tem ~650, César tem ~250), mas nenhum original.
  Os manuscritos diferem entre si em ~400.000 pontos — a grande maioria variantes
  ortográficas insignificantes. As variações que afetam o sentido são raras e bem
  documentadas.
- A crítica textual é a ciência de comparar manuscritos para reconstruir o texto mais
  próximo do original. Ela não destrói a Bíblia — a fortalece, mostrando que o texto
  foi preservado com extraordinária fidelidade considerando 1.900 anos de cópia manual.
- Conexão bíblica: João 7:53–8:11 (a mulher adúltera) e Marcos 16:9–20 (o final
  longo de Marcos) são os dois maiores exemplos de passagens com suporte manuscrito
  tardio — notas em sua Bíblia provavelmente alertam sobre isso. O aluno aprende
  por que essas notas existem.

---

### H4-M02 — Cânon, Manuscritos e Tradução: O Texto que Você Lê

**ID:** H4-M02
**XP total:** 60
**Tipo de unidades:** 3 × `context_history`
**Período:** Século II–XVI d.C.
**Lugares-chave:** Cartago (concílios), Constantinopla, Erasmo em Basileia

**Palavra-âncora do módulo:** κανών (cânon — a palavra grega para "régua/medida",
adotada para descrever a lista de livros autoritativos)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | Como o cânon do NT foi formado | Critérios, controvérsias, concílios | 2 Pedro 3:15–16 — cartas de Paulo como "Escritura" |
| U02 | Os grandes manuscritos: Sinaiticus e Vaticanus | Descoberta e importância | Variantes em Marcos 1:1 |
| U03 | Da LXX a Luther: 1.500 anos de tradução | Jerônimo, Lutero, KJV, ARA | Romanos 1:17 — "o justo viverá pela fé" |

**Conteúdo obrigatório por unidade:**

*U01 — A formação do cânon:*
- O cânon do NT não foi decidido por um único concílio em uma única data. Foi um
  processo gradual de reconhecimento das comunidades cristãs ao longo dos séculos II–IV.
  Os critérios usados: apostolicidade (ligação com um apóstolo), uso amplo nas igrejas,
  consistência teológica.
- O Cânon de Muratori (~180 d.C.) é a lista mais antiga de livros aceitos — já inclui
  os quatro Evangelhos, Atos, 13 cartas de Paulo, 1 João e Apocalipse. Hebreus, Tiago,
  2 Pedro e 3 João levaram mais tempo para serem universalmente aceitos.
- Atanásio de Alexandria, em sua Carta de Páscoa de 367 d.C., lista exatamente os 27
  livros do NT que conhecemos hoje — a primeira vez que essa lista aparece completa.
  Concílios de Hipona (393 d.C.) e Cartago (397 d.C.) ratificaram a lista.
- Conexão bíblica: 2 Pedro 3:15–16 — Pedro se refere às cartas de Paulo como "Escrituras"
  — indicando que a sacralização das cartas paulinas começou dentro do próprio NT.

*U02 — Sinaiticus e Vaticanus:*
- Codex Sinaiticus (~330–360 d.C.) foi descoberto no mosteiro de Santa Catarina no
  Sinai por Constantin Tischendorf em 1844. Contém o NT completo e parte do AT —
  escrito em pergaminho de alta qualidade, quatro colunas por página. Hoje dividido
  entre o British Museum, Leipzig, São Petersburgo e o próprio mosteiro.
- Codex Vaticanus (~325–350 d.C.) está na Biblioteca do Vaticano desde pelo menos
  1475 — o mais completo dos grandes manuscritos. Junto com o Sinaiticus, forma a
  base do texto crítico grego moderno (NA28/UBS5) — o grego que os alunos do Koiné
  estão aprendendo a ler.
- Conexão bíblica: Marcos 1:1 — alguns manuscritos omitem "Filho de Deus" no início
  de Marcos. O Sinaiticus o inclui; alguns papiros não. Este é um exemplo real de
  variante textual e como a crítica textual a aborda.

*U03 — Da LXX a Luther:*
- A Septuaginta (LXX, ~250–150 a.C.) foi a Bíblia dos autores do NT — Paulo cita
  o AT em grego, não em hebraico. Jesus possivelmente usava ambos.
- Jerônimo traduziu a Bíblia para o latim (Vulgata, ~382–405 d.C.) — que permaneceu
  a Bíblia oficial do Ocidente por mais de mil anos.
- Erasmo publicou o primeiro NT grego impresso (1516) — baseado em manuscritos tardios,
  com erros, mas revolucionário. Martinho Lutero o usou para traduzir o NT para o alemão
  (1522) — um dos eventos que acelerou a Reforma.
- A King James Version (1611) — tradução para o inglês comissionada pelo rei Jaime I —
  usou o Textus Receptus de Erasmo. A Almeida Revista e Atualizada (ARA) em português
  segue a mesma tradição, com revisões.
- O aluno que aprende grego no Koiné está aprendendo a língua que Erasmo quis que todos
  lessem — o sonho da Reforma de devolver a Escritura ao leitor comum.
- Conexão bíblica: Romanos 1:17 — "o justo viverá pela fé" — a frase que Lutero
  leu em grego e que mudou a história do Ocidente.

---

### H4-M03 — A Septuaginta e o AT que Paulo Conhecia

**ID:** H4-M03
**XP total:** 65
**Tipo de unidades:** 3 × `context_history`
**Período:** 250 a.C. – 100 d.C.
**Lugares-chave:** Alexandria, Qumran

**Palavra-âncora do módulo:** νόμος καὶ προφῆται (a lei e os profetas — a forma
pela qual Jesus e os autores do NT referem-se ao AT)

**Unidades:**

| Ordem | Tema | Foco | Conexão bíblica |
|-------|------|------|----------------|
| U01 | A Septuaginta: origem e importância | A lenda dos 70 sábios | Atos 7:42 — Estêvão cita o AT em grego |
| U02 | Como os autores do NT citam o AT | Cumprimento, tipologia, midrash | Mateus 1:23 — Isaías 7:14 na LXX |
| U03 — | Os Manuscritos do Mar Morto | Qumran e a preservação do AT | Lucas 4:17–19 — Jesus lê Isaías |

**Conteúdo obrigatório por unidade:**

*U01 — A Septuaginta:*
- A Septuaginta (LXX — "setenta", referindo-se à lenda dos 70 ou 72 sábios que a
  traduziram) é a tradução do AT hebraico para o grego, produzida em Alexandria entre
  ~250 e 150 a.C. para os judeus da diáspora que não liam mais hebraico com fluência.
- A LXX não é uma tradução literal — é interpretativa, e algumas diferenças em relação
  ao hebraico são teologicamente significativas. Paulo cita o AT quase sempre da LXX,
  não do hebraico. Quando o NT "cita" o AT, é quase sempre a LXX que está sendo citada.
- Conexão bíblica: Atos 7 — o discurso de Estêvão cita o AT extensamente. Seus números
  (Gênesis 46:27 — "75 almas") diferem do hebraico (70) porque ele cita a LXX.
  Os ouvintes do discurso de Estêvão reconheceriam a LXX imediatamente.

*U02 — Como o NT cita o AT:*
- Os autores do NT usam o AT de formas que podem desconcertar o leitor moderno
  acostumado com citação literal: cumprimento direto, tipologia (evento do AT como
  "tipo" de evento no NT), aplicação analógica, e pesher (leitura do texto antigo
  como referindo-se ao presente da comunidade — prática comum em Qumran).
- Um exemplo claro: Mateus 1:23 cita Isaías 7:14 ("a virgem conceberá") — mas em
  hebraico, a palavra é עַלְמָה (almah = jovem mulher). A LXX traduziu por παρθένος
  (parthenos = virgem). Mateus usa a LXX, não o hebraico. A discussão entre judeus
  e cristãos sobre esta passagem começou no século I e continua.
- Conexão bíblica: Mateus 1:22–23 e a cadeia de citações de cumprimento do AT
  ao longo de Mateus 1–2.

*U03 — Os Manuscritos do Mar Morto:*
- Em 1947, um pastor beduíno jogou uma pedra numa caverna perto de Qumran e ouviu
  o som de jarros se quebrando — e encontrou os Manuscritos do Mar Morto, escondidos
  pelos essênios antes da chegada dos romanos em 68 d.C. Os manuscritos incluem
  fragmentos de quase todos os livros do AT — mil anos mais antigos do que qualquer
  manuscrito hebraico anterior.
- A descoberta confirmou a extraordinária fidelidade da transmissão textual do AT:
  o Rolo de Isaías de Qumran (~150 a.C.) é virtualmente idêntico ao texto hebraico
  medieval — 1.000 anos de cópia com diferenças mínimas.
- Conexão bíblica: Lucas 4:17–19 — Jesus recebe o rolo de Isaías na sinagoga de
  Nazaré e lê Isaías 61:1–2. O mesmo texto que estava sendo estudado em Qumran
  a poucos quilômetros estava sendo lido por Jesus em Nazaré. O aluno pode sentir
  a proximidade física e histórica.

**Fase de Aplicação (Aula do Versículo Final — Bloco H4):**
Versículo: *πᾶσα γραφὴ θεόπνευστος...* (2 Timóteo 3:16)

1. Análise do vocabulário: γραφή (escrita/Escritura — da mesma raiz de γράφω,
   escrever) e θεόπνευστος (θεός + πνεύστος — "soprado por Deus"). Este segundo
   é hápax legomenon — aparece apenas uma vez no NT. Paulo pode tê-lo cunhado.
2. Questão de síntese: "Após aprender como o NT foi escrito, copiado e transmitido —
   em papiro, por copistas humanos, com variantes textuais, traduzido ao longo de
   milênios — o que a palavra θεόπνευστος ('inspirada por Deus') significa para você
   agora que você sabe como foi o processo humano?"
3. Conexão com a jornada: o aluno que chegou até aqui aprendeu grego, história do
   Império Romano, topografia de Jerusalém, contexto dos escritores, e história
   da transmissão textual. A Bíblia que ele lê em português passou por todas essas
   mãos e chegou até ele. Isso não enfraquece a fé — aprofunda a gratidão.

---

## TABELA MESTRE DE CONTEÚDO (REFERÊNCIA RÁPIDA)

| ID | Título | Tema central | Palavra-âncora | XP |
|----|--------|-------------|----------------|-----|
| H1-M01 | O Mediterrâneo no Século I | Grego como língua global | οἰκουμένη | 60 |
| H1-M02 | O Império Romano | Poder, estradas, cidadania | εἰρήνη | 60 |
| H1-M03 | A Palestina sob Roma | Herodes e Pilatos | βασιλεύς | 65 |
| H1-M04 | Judaísmo do Segundo Templo | Fariseus, Saduceus, Essênios | νόμος | 65 |
| H2-M01 | Jerusalém: Topografia | Bairros e vida cotidiana | ἱερόν | 60 |
| H2-M02 | O Templo de Herodes | Arquitetura e funcionamento | καταπέτασμα | 65 |
| H2-M03 | A Semana da Páscoa | Cronologia e crucificação | πάσχα | 65 |
| H2-M04 | Cafarnaum e a Galileia | Os caminhos de Jesus | γῆ | 60 |
| H3-M01 | Paulo: de Tarso a Roma | Viagens e cartas | χάρις | 65 |
| H3-M02 | João e a Comunidade Joanina | Éfeso, Evangelho, Apocalipse | ἀγάπη | 65 |
| H3-M03 | Lucas e Atos | O historiador e a expansão | διήγησις | 60 |
| H3-M04 | Marcos, Mateus e o Problema Sinótico | Origens dos Evangelhos | εὐαγγέλιον | 60 |
| H4-M01 | Do Papiro ao Códice | Materiais e cópia | γραφή | 60 |
| H4-M02 | Cânon e Tradução | De Atanásio a Lutero | κανών | 60 |
| H4-M03 | A Septuaginta e o AT | O AT que Paulo conhecia | νόμος καὶ προφῆται | 65 |

**Total da trilha:** 15 módulos · ~930 XP

---

## REGRAS DE GERAÇÃO DE MÓDULOS DESTA TRILHA

### Princípios editoriais específicos

1. **Tom de guia, não de enciclopédia.** A explicação deve soar como alguém que
   esteve lá — ou como um professor que leu tudo e consegue visualizar a cena.
   Diferença: "Cafarnaum era uma cidade de pescadores" (enciclopédia) vs. "quando
   Jesus entrou na sinagoga de Cafarnaum, a estrutura de pedra basáltica que seus pés
   pisaram ainda existe — você pode tocá-la." (guia).

2. **O detalhe arqueológico como âncora.** Sempre que possível, ancoras o conteúdo em
   algo físico: uma inscrição encontrada, um papiro específico, uma escavação datada.
   Isso distingue "história que contamos" de "história que evidências confirmam."

3. **A conexão bíblica é obrigatória e deve ser surpreendente.** Não use a conexão
   bíblica para repetir o que o aluno já sabe. Use-a para mostrar o que ele ainda não
   enxergou — o detalhe que só faz sentido agora que ele tem o contexto.

4. **Palavra-âncora em grego.** Cada módulo tem uma palavra grega central que conecta
   a história ao idioma que o aluno está aprendendo. Isso cria pontes entre as trilhas.

5. **Sem anacronismo.** Não use conceitos modernos para descrever o mundo antigo sem
   qualificação. "Democracia", "classe média", "terrorismo", "genocídio" são categorias
   modernas que distorcem quando aplicadas ao século I sem cuidado.

### O que esta trilha NÃO é

- Não é apologética cristã. Os fatos históricos são apresentados como historiadores
  os apresentam — sem pressão para concluir fé a partir deles.
- Não é crítica desconstrutiva. A intenção não é semear dúvida, mas contextualizar.
- Não é substituição da Bíblia. A Escritura não precisa de defesa histórica para ser
  válida — mas o contexto histórico a torna mais legível.

---

## CHECKLIST DE REVISÃO POR MÓDULO (TRILHA HISTÓRICA)

```
[ ] O módulo tem as seções obrigatórias do tipo context_history:
    EXPOSIÇÃO, MAPA/IMAGEM, CONEXÃO BÍBLICA, RECONHECIMENTO,
    ASSOCIAÇÃO, APLICAÇÃO?

[ ] Os campos do cabeçalho estão preenchidos:
    periodo, lugar, personagem, artefato?

[ ] O campo `bible_connection` tem pelo menos um versículo específico
    com comentário de por que o contexto o ilumina?

[ ] A "palavra-âncora" do módulo aparece na exposição com seu
    significado grego explicado?

[ ] O módulo tem pelo menos um detalhe arqueológico ou de fonte
    primária (inscrição, manuscrito, artefato identificado)?

[ ] O tom é de guia/professor, não de verbete de enciclopédia?

[ ] A conexão bíblica mostra algo novo — não repete o texto mas
    o ilumina pelo contexto?

[ ] A fase de aplicação pede ao aluno que releia uma passagem
    bíblica com os olhos do contexto aprendido?

[ ] Nenhum anacronismo não qualificado aparece na exposição?

[ ] O módulo se conecta aos módulos adjacentes (anterior e próximo)?
```

---

*GRADE CURRICULAR — HISTÓRIA DO NT · Koiné App*
*Versão 1.0 — Trilha Paralela Extracurricular*
*Usar em conjunto com: ORQUESTRADOR_EDITORIAL.md, SISTEMA_FATURACAO_CONTEUDO.md,*
*GRADE_CURRICULAR_KOINE.md, CORRECOES_SISTEMICAS_V1.md*
*Próxima revisão: após produção e revisão dos primeiros 4 módulos (Bloco H1).*
