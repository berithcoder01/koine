// src/content/history/history-units.ts
import type { HistoryUnit } from '@/core/types/history.types';

export const HISTORY_UNITS: HistoryUnit[] = [
  // ═══════════════════════════════════════════════════════════════
  // BLOCO H1 — O Mundo Que Viu Jesus Nascer
  // ═══════════════════════════════════════════════════════════════

  // H1-M01 — O Mediterrâneo no Século I
  {
    id: 'H1-M01-U01',
    moduleId: 'H1-M01',
    unitOrder: 1,
    title: 'Alexandre e o grego como língua global',
    periodLabel: '336–323 a.C.',
    locationLabel: 'Macedônia ao Egito',
    keyFigure: 'Alexandre Magno',
    artifactNote: 'Mapa das conquistas de Alexandre com sobreposição das cidades paulinas',
    artifactImage: '/artifacts/H1/maps/alexander-conquests.png',
    bibleConnection: 'João 12:20 — gregos que queriam ver Jesus',
    content: `Alexandre conquistou do Egito à Índia entre 334 e 323 a.C. Ao morrer com 32 anos, deixou um legado mais duradouro do que qualquer conquista territorial: a língua grega como idioma comum de todo o mundo mediterrâneo.

O grego koiné ("comum") não é o grego clássico de Platão — é uma versão simplificada, mesclada com influências locais, falada por gregos e não-gregos igualmente. É o grego que um pescador da Galileia, um fariseu de Tarso e um procurador romano conseguiam usar para se comunicar.

**Conexão bíblica:** João 12:20 — "havia alguns gregos entre os que tinham subido para adorar na festa." Gregos (não judeus) vão ao Templo em Jerusalém, falam com Felipe (nome grego), que fala com André (nome grego), que fala com Jesus. Esta cena seria impossível sem o mundo helenizado de Alexandre.

> "Paulo não precisou aprender idiomas para evangelizar. Alexandre já tinha feito esse trabalho 350 anos antes."`,
    isPremium: false,
  },
  {
    id: 'H1-M01-U02',
    moduleId: 'H1-M01',
    unitOrder: 2,
    title: 'A Diáspora Judaica e o grego koiné',
    periodLabel: 'Séculos III a.C. – I d.C.',
    locationLabel: 'Alexandria, Antioquia, todo Mediterrâneo',
    keyFigure: 'Comunidades da diáspora',
    artifactNote: 'Mapa das comunidades judaicas na diáspora com estimativas populacionais',
    artifactImage: '/artifacts/H1/maps/jewish-diaspora.svg',
    bibleConnection: 'Atos 6:1 — helenistas vs. hebreus',
    content: `Após as conquistas assíria e babilônica e migrações voluntárias, judeus viviam espalhados por todo o Mediterrâneo. Na época de Jesus, estimava-se que mais judeus viviam fora da Palestina do que dentro dela.

Alexandria tinha a maior comunidade judaica fora de Jerusalém — e foi lá que nasceu a Septuaginta (LXX), a tradução do AT para o grego, entre os séculos III e I a.C. Os judeus da diáspora usavam o grego como primeira língua.

Isso explica um dado surpreendente: Paulo, judeu de Tarso, criado "aos pés de Gamaliel" em Jerusalém, escreve suas cartas em grego fluente — porque o grego era a língua dos judeus cultos fora da Palestina.

**Conexão bíblica:** Atos 6:1 — "naqueles dias, como os discípulos iam aumentando, houve uma murmuração dos helenistas contra os hebreus." Esta tensão dentro da própria comunidade cristã primitiva reflete a divisão linguística e cultural que existia dentro do judaísmo.`,
    isPremium: false,
  },
  {
    id: 'H1-M01-U03',
    moduleId: 'H1-M01',
    unitOrder: 3,
    title: 'Augusto e a Pax Romana',
    periodLabel: '27 a.C. – 14 d.C.',
    locationLabel: 'Roma e todo o Império',
    keyFigure: 'César Augusto',
    artifactNote: 'Mapa das estradas romanas no século I com rotas das viagens paulinas',
    artifactImage: '/artifacts/H1/maps/roman-roads.svg',
    bibleConnection: 'Lucas 2:1–7 — o censo que moveu José e Maria',
    content: `César Augusto (27 a.C. – 14 d.C.) é o imperador no trono quando Jesus nasce. A "Pax Romana" não era paz no sentido moderno; era a supressão violenta de toda resistência. Mas seu efeito prático era estabilidade, estradas funcionando, comércio fluindo.

Três condições criadas por Roma tornaram o NT possível: (1) a língua comum (grego), (2) as estradas (Via Appia, Via Egnatia — Paulo as usou todas), (3) o correio e a possibilidade de enviar cartas a comunidades distantes.

O censo de Lucas 2:1 é historicamente controverso em seus detalhes, mas reflete a realidade do aparato administrativo romano — o Império controlava e contava sua população com regularidade.

**Conexão bíblica:** Lucas 2:1–7 — o censo que leva José e Maria de Nazaré a Belém. A logística do Império Romano moveu uma família grávida 120 km para que uma profecia de Miqueias 5:2 se cumprisse.`,
    isPremium: false,
  },

  // H1-M02 — O Império Romano
  {
    id: 'H1-M02-U01',
    moduleId: 'H1-M02',
    unitOrder: 1,
    title: 'Como Roma governava províncias',
    periodLabel: '27 a.C. – 100 d.C.',
    locationLabel: 'Roma e províncias',
    keyFigure: 'Pôncio Pilatos',
    artifactNote: 'Inscrição de Pilatos (Cesareia Marítima, 1961)',
    artifactImage: '/artifacts/H1/photos/pilatus-inscription.jpg',
    bibleConnection: 'Lucas 3:1–2 — a lista de governantes',
    content: `O Império dividia seus territórios em províncias senatoriais (estáveis) e províncias imperiais (fronteiras ou zonas de tensão). A Judeia era província imperial — classificada como zona de risco.

O governador de uma província imperial recebia o título de praefectus ou procurator. Pôncio Pilatos era praefectus da Judeia (26–36 d.C.) — confirmado por uma inscrição de pedra encontrada em Cesareia Marítima em 1961.

O sistema tinha três camadas: o governador romano (autoridade militar e judicial suprema), a aristocracia local colaboracionista (o Sumo Sacerdote e o Sinédrio), e a população. Este arranjo gerava a tensão que permeia os Evangelhos.

**Conexão bíblica:** Lucas 3:1–2 — Lucas lista seis autoridades políticas e religiosas ao mesmo tempo para situar o início do ministério de João Batista. É um ato deliberado de historiador.`,
    isPremium: false,
  },
  {
    id: 'H1-M02-U02',
    moduleId: 'H1-M02',
    unitOrder: 2,
    title: 'As estradas romanas e o correio',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Via Egnatia, todo o Império',
    keyFigure: 'Paulo e seus portadores',
    artifactNote: 'Mapa da Via Egnatia com cidades paulinas',
    artifactImage: '/artifacts/H1/maps/via-egnatia.png',
    bibleConnection: 'Romanos 15:24–28 — planos de viagem de Paulo',
    content: `Roma construiu ~85.000 km de estradas pavimentadas — uma rede que durou séculos. Estradas eram primariamente militares, mas tornaram-se artérias de comércio, comunicação e evangelização.

A Via Egnatia cruzava a Macedonia de Dirráquio a Bizâncio — passando por Filipos, Tessalônica e Bereia. Paulo a percorreu nas viagens missionárias. Quando ele escreve aos Filipenses e aos Tessalonicenses, está escrevendo para cidades nessa estrada.

Cartas podiam viajar de Roma a Antioquia em ~6–8 semanas pelos serviços postais romanos. Paulo usava portadores pessoais — Tíquico, Febe, Epafrodito. A carta aos Romanos foi provavelmente entregue por Febe (Romanos 16:1–2).

**Conexão bíblica:** Romanos 15:24–28 — Paulo planeja ir à Espanha via Roma. Esse plano só fazia sentido com as estradas romanas.`,
    isPremium: false,
  },
  {
    id: 'H1-M02-U03',
    moduleId: 'H1-M02',
    unitOrder: 3,
    title: 'Cidadania romana e seus privilégios',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Todo o Império',
    keyFigure: 'Paulo, cidadão romano',
    artifactNote: 'Diploma de cidadania romana do século I (tabuinhas de bronze)',
    artifactImage: '/artifacts/H1/photos/roman-citizenship-diploma.jpg',
    bibleConnection: 'Atos 22:25–29 — Paulo e a cidadania',
    content: `Ser cidadão romano no século I era uma distinção enorme — dava direito a julgamento em Roma, proteção contra punições sumárias, e acesso a cargos e comércio privilegiados. Em 212 d.C. todos os habitantes livres receberiam a cidadania; até então, era herança ou concessão.

Paulo era cidadão romano de nascença (Atos 22:28) — o que sugere que sua família havia recebido a cidadania, possivelmente por serviços ao Império. Isso o tornava simultaneamente judeu devoto, cidadão romano e falante nativo de grego.

A cidadania aparece em Atos como recurso narrativo recorrente: Paulo a invoca para impedir punições ilegais (Atos 16:37–38), para ser levado a Cesareia (Atos 25:11), e finalmente para apelar a César.

**Conexão bíblica:** Atos 22:25–29 — o tribuno descobre que Paulo é cidadão romano e recua. Mas há ironia: Paulo vai preferir a cidadania celestial (Filipenses 3:20 — πολίτευμα ἐν οὐρανοῖς).`,
    isPremium: false,
  },

  // H1-M03 — A Palestina sob Roma
  {
    id: 'H1-M03-U01',
    moduleId: 'H1-M03',
    unitOrder: 1,
    title: 'Herodes, o Grande: o rei construtor',
    periodLabel: '37–4 a.C.',
    locationLabel: 'Jerusalém, Cesareia, Massada',
    keyFigure: 'Herodes I',
    artifactNote: 'Fotografia aérea do Monte do Templo com sobreposição da planta herodiana',
    artifactImage: '/artifacts/H1/photos/temple-mount-aerial.jpg',
    bibleConnection: 'Mateus 2:1–18 — massacre dos inocentes',
    content: `Herodes governou a Judeia de 37 a 4 a.C. como "rei dos judeus" por nomeação do Senado romano — não por linhagem davídica. Era idumeu (edomita), não judeu de nascença.

Seu projeto de construção foi monumental: o porto de Cesareia Marítima, a fortaleza de Massada, o palácio de Jericó, e — mais importante — a reconstrução do Templo de Jerusalém.

O massacre dos inocentes (Mateus 2) é consistente com o caráter histórico de Herodes: ele mandou executar três filhos próprios, sua esposa preferida e inúmeros opositores. Augusto disse: "prefiro ser o porco de Herodes do que seu filho."

Herodes morre em 4 a.C. — o que obriga os historiadores a datarem o nascimento de Jesus antes de 4 a.C. (provavelmente 6–4 a.C.).

**Conexão bíblica:** Mateus 2:3 — "Herodes ficou perturbado, e com ele toda Jerusalém." "Toda Jerusalém" — porque a cidade sabia o que Herodes era capaz.`,
    isPremium: false,
  },
  {
    id: 'H1-M03-U02',
    moduleId: 'H1-M03',
    unitOrder: 2,
    title: 'Arquelaos, Antipas e Filipe',
    periodLabel: '4 a.C. – 39 d.C.',
    locationLabel: 'Judeia, Galileia, territórios ao nordeste',
    keyFigure: 'Herodes Antipas',
    artifactNote: 'Mapa da divisão do reino de Herodes entre seus filhos',
    artifactImage: '/artifacts/H1/maps/herod-tetrarchy.png',
    bibleConnection: 'Lucas 23:7–12 — Jesus diante de Antipas',
    content: `Quando Herodes morreu, seu reino foi dividido entre três filhos. Arquelaos ficou com a Judeia (mas foi tão violento que Roma o exilou em 6 d.C.). Herodes Filipe ficou com os territórios ao nordeste. Herodes Antipas ficou com a Galileia e Pereia.

Herodes Antipas mandou decapitar João Batista (Marcos 6:14–29) — confirmado por Flávio Josefo. Quando Jesus é enviado a Antipas por Pilatos, Antipas "ficou muito contente" — queria ver um milagre como entretenimento. Jesus não diz uma palavra a Antipas (Lucas 23:9).

**Conexão bíblica:** Lucas 23:7–12 — o episódio de Jesus com Antipas. E Marcos 6:14–29 — a morte de João Batista.`,
    isPremium: false,
  },
  {
    id: 'H1-M03-U03',
    moduleId: 'H1-M03',
    unitOrder: 3,
    title: 'Pôncio Pilatos e os procuradores romanos',
    periodLabel: '26–36 d.C.',
    locationLabel: 'Cesareia Marítima, Jerusalém',
    keyFigure: 'Pôncio Pilatos',
    artifactNote: 'Inscrição de Pilatos (Museu de Israel)',
    artifactImage: '/artifacts/H1/photos/pilatus-inscription.jpg',
    bibleConnection: 'João 18:28–19:22 — o julgamento',
    content: `Pilatos governou a Judeia de 26 a 36 d.C. — o período inteiro do ministério de João Batista, de Jesus, e dos primeiros anos da Igreja. Fontes romanas e judaicas descrevem Pilatos como administrativamente competente, mas capaz de provocações.

O julgamento de Jesus é narrado nos quatro Evangelhos: Pilatos não encontra culpa, resiste brevemente, mas cede à pressão. João apresenta o diálogo mais elaborado — "O que é a verdade?" (18:38).

A inscrição na cruz — "Jesus Nazareno, Rei dos Judeus" em hebraico, latim e grego (João 19:20) — é um detalhe verossímil: Pilatos a usa para irritar os sacerdotes.

**Conexão bíblica:** João 19:22 — "ὃ γέγραφα γέγραφα" ("O que escrevi, escrevi") — forma do perfeito grego: ação concluída com efeito permanente.`,
    isPremium: false,
  },

  // H1-M04 — Judaísmo do Segundo Templo
  {
    id: 'H1-M04-U01',
    moduleId: 'H1-M04',
    unitOrder: 1,
    title: 'Fariseus: a tradição oral e a piedade popular',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Sinagogas da Palestina',
    keyFigure: 'Fariseus, Gamaliel, Nicodemos',
    artifactNote: 'N/A',
    bibleConnection: 'Marcos 7:1–13 — tradição dos anciãos',
    content: `Os fariseus eram o grupo religioso mais influente — não por poder político (esse era dos saduceus), mas por terem o coração do povo. Eram leigos devotos, mestres da Torá, que acreditavam que a lei devia ser aplicada a cada aspecto da vida cotidiana.

Eles desenvolveram a "tradição oral" — interpretações e aplicações práticas da Torá. Jesus debatia com eles sobre essa tradição, não contra a Torá em si.

O retrato dos fariseus nos Evangelhos é sombrio, mas é o retrato de um conflito real. Paulo era fariseu (Filipenses 3:5). Gamaliel defende os apóstolos no Sinédrio (Atos 5:34–39). Nicodemos, que vai a Jesus à noite, era fariseu (João 3:1).

**Conexão bíblica:** Marcos 7:1–13 — o debate sobre lavar as mãos. Jesus não diz que lavar as mãos é errado — diz que elevar a tradição oral ao nível da Escritura é um problema.`,
    isPremium: false,
  },
  {
    id: 'H1-M04-U02',
    moduleId: 'H1-M04',
    unitOrder: 2,
    title: 'Saduceus, Sumo Sacerdote e o poder do Templo',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Templo de Jerusalém',
    keyFigure: 'Caifás, Anás',
    artifactNote: 'N/A',
    bibleConnection: 'João 11:47–53 — a reunião do Sinédrio',
    content: `Os saduceus eram a aristocracia sacerdotal de Jerusalém — controlavam o Templo, o Sinédrio e as finanças do culto. Politicamente, eram colaboracionistas com Roma.

Teologicamente, aceitavam apenas o Pentateuco — o que os levava a rejeitar a ressurreição dos mortos, os anjos e a vida após a morte (Marcos 12:18–27).

O Sumo Sacerdote no julgamento de Jesus era Caifás (18–36 d.C.). O julgamento era, do ponto de vista dos saduceus, uma questão de sobrevivência política: se o movimento messiânico crescesse demais, Roma interviria.

Os saduceus desapareceram como grupo após 70 d.C. Sem Templo, sem sacerdócio, sem poder.

**Conexão bíblica:** João 11:48 — Caifás diz: "é melhor que um homem morra pelo povo." João comenta que Caifás profetizou sem saber.`,
    isPremium: false,
  },
  {
    id: 'H1-M04-U03',
    moduleId: 'H1-M04',
    unitOrder: 3,
    title: 'Essênios e Zelotes: as respostas radicais',
    periodLabel: '165 a.C. – 70 d.C.',
    locationLabel: 'Qumran, Masada',
    keyFigure: 'Comunidade de Qumran, Simão o Zelote',
    artifactNote: 'Fotografia das ruínas de Qumran com os jarros de barro',
    artifactImage: '/artifacts/H1/photos/qumran-ruins.jpg',
    bibleConnection: 'Lucas 6:15 — Simão, o Zelote',
    content: `Os essênios responderam à corrupção do Templo e à ocupação romana com retirada. A comunidade de Qumran, às margens do Mar Morto, foi descoberta em 1947 com os Manuscritos do Mar Morto — a maior descoberta arqueológica bíblica do século XX.

Os zelotes responderam com resistência armada. Não eram um único grupo organizado, mas o movimento cresceu e culminou na Grande Revolta Judaica (66–73 d.C.).

Entre os doze apóstolos há um Simão chamado "o Zelote" (Lucas 6:15) — Jesus reunia pessoas de espectros políticos opostos. Mateus era cobrador de impostos (colaboracionista). Simão era zelote (resistência). À mesa de Jesus, eles comiam juntos.

**Conexão bíblica:** Mateus 22:15–22 — a pergunta sobre o imposto ("dai a César o que é de César"). Armadilha montada por fariseus e herodianos (grupos opostos que se uniram contra Jesus).`,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO H2 — Jerusalém
  // ═══════════════════════════════════════════════════════════════

  // H2-M01 — Jerusalém: Topografia
  {
    id: 'H2-M01-U01',
    moduleId: 'H2-M01',
    unitOrder: 1,
    title: 'A topografia de Jerusalém',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Jerusalém',
    keyFigure: 'N/A',
    artifactNote: 'Mapa topográfico de Jerusalém no século I',
    artifactImage: '/artifacts/H2/photos/jerusalem-model.jpg',
    bibleConnection: 'Lucas 19:41 — Jesus chora sobre Jerusalém',
    content: `Jerusalém no século I ficava sobre dois morros separados pelo Vale do Tiropeon. O monte a nordeste — o Monte Moriá — era onde ficava o Templo. O monte a sudoeste — a Cidade Alta — era o bairro aristocrático.

A leste, o Vale do Cedron separava a cidade do Monte das Oliveiras — o monte de onde Jesus fez sua entrada triunfal, onde ficava Getsêmani.

A população era de ~40.000–80.000 pessoas em tempos normais — mas triplicava ou quadruplicava durante as festas de peregrinação. A semana da Páscoa aconteceu nessa Jerusalém lotada.

**Conexão bíblica:** Lucas 19:41 — "quando se aproximou e avistou a cidade, chorou por ela." Jesus estava descendo o Monte das Oliveiras, olhando para Jerusalém à sua frente.`,
    isPremium: false,
  },
  {
    id: 'H2-M01-U02',
    moduleId: 'H2-M01',
    unitOrder: 2,
    title: 'Bairros, população e vida cotidiana',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Cidade Alta, Cidade Baixa',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'João 18:1 — o jardim do Cedron',
    content: `A Cidade Alta (sudoeste) era habitada pela aristocracia sacerdotal — palácio de Herodes Antipas, casa de Caifás, mansões com piscinas encontradas em escavações. A Cidade Baixa e os subúrbios eram densamente habitados pela população comum.

O Vale do Cedron, a leste, era o cemitério tradicional e rota de abastecimento. O jardim onde Jesus foi preso ficava nas encostas do Monte das Oliveiras.

A vida cotidiana era dominada pelo Templo — economicamente, religiosamente e politicamente.

**Conexão bíblica:** João 18:1–3 — "tendo dito estas coisas, saiu Jesus com seus discípulos para além do ribeiro Cedron." O ribeiro era pequeno — mais um córrego.`,
    isPremium: false,
  },
  {
    id: 'H2-M01-U03',
    moduleId: 'H2-M01',
    unitOrder: 3,
    title: 'As portas e os acessos ao Templo',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Monte do Templo',
    keyFigure: 'N/A',
    artifactNote: 'Mapa das entradas do Templo',
    artifactImage: '/artifacts/H2/maps/temple-floor-plan.jpg',
    bibleConnection: 'Marcos 11:1–11 — entrada triunfal',
    content: `A plataforma do Templo tinha várias entradas. O Portão Dourado ficava na muralha leste, voltado para o Monte das Oliveiras — a rota natural de quem vinha de Betânia. O Portão de Hulda ficava no sul e era o acesso mais movimentado.

A cena dos cambistas: no ἱερόν (pátio exterior do Templo), o Átrio dos Gentios, onde o comércio de animais e câmbio de moeda ocorria legitimamente. Jesus expulsa esses comerciantes — do ἱερόν, não do ναός.

**Conexão bíblica:** Marcos 11:11 — Jesus "entrou em Jerusalém, foi ao Templo, olhou em derredor para tudo" — um detalhe de testemunha ocular.`,
    isPremium: false,
  },

  // H2-M02 — O Templo de Herodes
  {
    id: 'H2-M02-U01',
    moduleId: 'H2-M02',
    unitOrder: 1,
    title: 'A construção: escala e engenharia',
    periodLabel: '20 a.C. – 70 d.C.',
    locationLabel: 'Monte Moriá',
    keyFigure: 'Herodes, o Grande',
    artifactNote: 'Reconstrução 3D do Templo de Herodes',
    artifactImage: '/artifacts/H2/photos/second-temple-model.jpg',
    bibleConnection: 'Marcos 13:1 — "que pedras!"',
    content: `Herodes construiu uma plataforma artificial sobre o Monte Moriá, com muros de sustentação de até 45 metros de altura. As pedras do muro ocidental pesam entre 2 e 600 toneladas. Uma delas tem 13,6 metros — o maior bloco de construção do mundo antigo fora do Egito.

O complexo inteiro cobria ~144.000 m² — equivalente a 20 campos de futebol. Os pórticos tinham colunas de mármore branco de 11,5 metros. Flávio Josefo escreve que parecia "uma montanha coberta de neve."

João 2:20 registra: "46 anos para construir este templo" — um detalhe cronológico preciso.

**Conexão bíblica:** Marcos 13:1 — os discípulos dizem: "Mestre, olha! Que pedras e que edifícios!" Jesus responde que tudo será demolido. Em 70 d.C., Tito cumpriu a profecia.`,
    isPremium: false,
  },
  {
    id: 'H2-M02-U02',
    moduleId: 'H2-M02',
    unitOrder: 2,
    title: 'Os pátios: quem podia ir onde',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Monte do Templo',
    keyFigure: 'N/A',
    artifactNote: 'Inscrição proibindo gentios (Museu de Israel)',
    artifactImage: '/artifacts/H2/photos/soreg-inscription.jpg',
    bibleConnection: 'Atos 21:28 — Paulo acusado de profanar',
    content: `O Templo era uma série de pátios concêntricos com acesso progressivamente restrito:
- Átrio dos Gentios: qualquer pessoa
- Pátio das Mulheres: judeus de ambos os sexos
- Pátio de Israel: somente homens judeus
- Pátio dos Sacerdotes: somente sacerdotes
- Santuário (ναός): somente o Sumo Sacerdote, uma vez por ano

Uma inscrição de pedra encontrada em 1871 proibia gentios de entrar além do Átrio sob pena de morte.

**Conexão bíblica:** Atos 21:27–29 — Paulo é acusado de ter levado o gentio Trófimo além do limite. A multidão tenta linchar Paulo.`,
    isPremium: false,
  },
  {
    id: 'H2-M02-U03',
    moduleId: 'H2-M02',
    unitOrder: 3,
    title: 'O Santo dos Santos e o véu',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Santuário interior',
    keyFigure: 'Sumo Sacerdote',
    artifactNote: 'Diagrama do ναός com divisões internas',
    artifactImage: '/artifacts/H2/photos/temple-closeup.jpg',
    bibleConnection: 'Marcos 15:38 — o véu se rasga',
    content: `O ναός era dividido em dois cômodos: o Lugar Santo (altar de incenso, menorá, mesa dos pães) e o Lugar Santíssimo, separados pelo καταπέτασμα — o véu.

O véu tinha ~18 metros de altura, feito de linho, lã azul, púrpura e escarlate, e representava os céus separando Deus da criação.

Marcos 15:38 registra que o véu "se rasgou em dois, de cima abaixo." A direção importa: de cima — não foi derrubado, foi rasgado de dentro. Hebreus 10:19–20 desenvolve o simbolismo: o véu rasgado é o caminho aberto à presença de Deus.

**Conexão bíblica:** Marcos 15:38 e Hebreus 10:19–22.`,
    isPremium: false,
  },

  // H2-M03 — A Semana da Páscoa
  {
    id: 'H2-M03-U01',
    moduleId: 'H2-M03',
    unitOrder: 1,
    title: 'O que era a Páscoa no século I',
    periodLabel: '~30 d.C.',
    locationLabel: 'Jerusalém',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'João 18:28 — não se contaminar antes da Páscoa',
    content: `A Páscoa era a maior das três festas de peregrinação. A população multiplicava por 4–5 durante a semana — talvez 200.000–300.000 pessoas. Flávio Josefo menciona 256.500 cordeiros sacrificados em uma única Páscoa.

O ritual central era o sacrifício do cordeiro pascal na tarde de 14 Nisan e o banquete familiar (Seder) naquela noite. A Última Ceia foi esse banquete.

O ambiente político era de máxima tensão. A festa comemorava a libertação da escravidão — e em uma Jerusalém ocupada por Roma, esse simbolismo era inflamável.

**Conexão bíblica:** João 18:28 — os sacerdotes "não entraram no palácio para não se contaminarem e poderem comer a Páscoa." Ironia: preocupados com pureza ritual enquanto executavam uma injustiça.`,
    isPremium: false,
  },
  {
    id: 'H2-M03-U02',
    moduleId: 'H2-M03',
    unitOrder: 2,
    title: 'A cronologia da semana santa',
    periodLabel: '~30 d.C.',
    locationLabel: 'Jerusalém',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'Marcos 11–16 — estrutura narrativa',
    content: `A sequência narrativa dos Evangelhos sinóticos:
- Domingo: entrada triunfal (Mc 11:1–11)
- Segunda: maldição da figueira, expulsão dos cambistas (Mc 11:12–19)
- Terça: debates no Templo, discurso escatológico (Mc 11:20–13:37)
- Quarta: silêncio narrativo; unção em Betânia (Mc 14:3–9)
- Quinta: preparação da Páscoa, Última Ceia, Getsêmani, prisão (Mc 14:12–52)
- Sexta: julgamentos, crucificação, morte, sepultamento (Mc 14:53–15:47)
- Sábado: silêncio narrativo; Jesus na tumba
- Domingo: ressurreição (Mc 16:1–8)

**Conexão bíblica:** A estrutura inteira de Marcos 11–16.`,
    isPremium: false,
  },
  {
    id: 'H2-M03-U03',
    moduleId: 'H2-M03',
    unitOrder: 3,
    title: 'Crucificação: o método romano',
    periodLabel: '~30 d.C.',
    locationLabel: 'Gólgota',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'João 19:16–30',
    content: `A crucificação era reservada para escravos, rebeldes e inimigos do Estado — nunca para cidadãos romanos. Era punição de máxima desumanização: pública, lenta, projetada para destruir a dignidade.

O processo: flagelação, carregamento do patibulum (viga horizontal), fixação no stipes (poste vertical). A morte podia demorar dias — acelerada pelo crurifragium (quebrar as pernas).

A inscrição titulus (João 19:19–20 — em hebraico, latim e grego) anunciava o crime. A Gólgota ficava fora dos muros, em local visível de estradas.

**Conexão bíblica:** João 19:35 — "o que viu testificou." A lança que perfurou o lado e a saída de sangue e água eram sinais de morte confirmada para um médico do século I.`,
    isPremium: false,
  },

  // H2-M04 — Cafarnaum e a Galileia
  {
    id: 'H2-M04-U01',
    moduleId: 'H2-M04',
    unitOrder: 1,
    title: 'Galileia: a região e seu estigma',
    periodLabel: '~26–30 d.C.',
    locationLabel: 'Galileia',
    keyFigure: 'N/A',
    artifactNote: 'Barco do século I encontrado no Mar de Galileia (1986)',
    artifactImage: '/artifacts/H2/photos/galilee-boat.jpg',
    bibleConnection: 'João 1:46 — "algo bom pode vir de Nazaré?"',
    content: `A Galileia era uma região de fronteira no norte da Palestina. Historicamente, o Reino do Norte havia sido conquistado pela Assíria em 722 a.C. e repopulado com povos de várias origens — daí a mistura étnica que a tornava suspeita.

O Mar de Galileia é um lago de água doce de ~21 km × 13 km, a ~210 metros abaixo do nível do mar. A pesca era a principal indústria — Pedro, André, Tiago e João eram pescadores comerciais.

**Conexão bíblica:** João 1:46 — Natanael diz: "pode algo bom vir de Nazaré?" — a atitude de um judeu do sul em relação à Galileia.`,
    isPremium: false,
  },
  {
    id: 'H2-M04-U02',
    moduleId: 'H2-M04',
    unitOrder: 2,
    title: 'Cafarnaum: a base de operações',
    periodLabel: '~26–30 d.C.',
    locationLabel: 'Cafarnaum',
    keyFigure: 'Jesus, Pedro',
    artifactNote: 'Casa de Pedro com igreja octogonal do século V',
    artifactImage: '/artifacts/H2/photos/peters-house.jpg',
    bibleConnection: 'Marcos 1:21–34 — um dia em Cafarnaum',
    content: `Cafarnaum era uma cidade de pescadores às margens do lago. Jesus escolheu Cafarnaum como base (Mateus 4:13). A casa de Pedro foi transformada em casa-igreja nos primeiros séculos, com grafites em aramaico, grego e siriano invocando "Pedro" e "Jesus".

A sinagoga de Cafarnaum: a estrutura de pedra branca é do século IV, mas suas fundações são do século I — provavelmente a sinagoga onde Jesus ensinou (Marcos 1:21).

Marcos 1:21–34 descreve "um dia em Cafarnaum" que começa na sinagoga, vai para a casa de Pedro, e termina com a cidade inteira à porta.

**Conexão bíblica:** Marcos 1:21–34.`,
    isPremium: false,
  },
  {
    id: 'H2-M04-U03',
    moduleId: 'H2-M04',
    unitOrder: 3,
    title: 'As rotas de Jesus: Galileia a Jerusalém',
    periodLabel: '~26–30 d.C.',
    locationLabel: 'Via Samaria ou Vale do Jordão',
    keyFigure: 'N/A',
    artifactNote: 'Mapa das rotas com distâncias e tempos estimados',
    artifactImage: '/artifacts/H2/maps/palestine-routes.jpg',
    bibleConnection: 'Lucas 10:30 — o bom samaritano',
    content: `A principal rota de Galileia a Jerusalém passava pela Samaria (direta) ou contornava pelo vale do Jordão, passando por Jericó (mais longa). A distância de Cafarnaum a Jerusalém é ~170 km — cerca de 4 dias de caminhada.

A estrada de Jerusalém a Jericó desce ~1.000 metros em ~27 km — uma descida íngreme pelo deserto da Judeia, conhecida por ser perigosa. O bom samaritano de Lucas 10 é situado nessa estrada específica.

Betânia ficava a ~3 km a leste de Jerusalém — a aldeia de Maria, Marta e Lázaro.

**Conexão bíblica:** Lucas 10:30 — "um homem descia de Jerusalém a Jericó." Não uma estrada imaginária — a estrada existe, o perigo era real.`,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO H3 — Os Escritores e os Textos (Premium)
  // ═══════════════════════════════════════════════════════════════

  // H3-M01 — Paulo
  {
    id: 'H3-M01-U01',
    moduleId: 'H3-M01',
    unitOrder: 1,
    title: 'Quem era Paulo antes de Damasco',
    periodLabel: '~5–35 d.C.',
    locationLabel: 'Tarso, Jerusalém',
    keyFigure: 'Paulo de Tarso',
    artifactNote: 'N/A',
    bibleConnection: 'Filipenses 3:4–6 — o currículo de Paulo',
    content: `Paulo nasceu em Tarso — cidade universitária, capital da Cilícia, de cultura greco-romana. Era cidadão romano de nascença e judeu da diáspora de família farisaica. Foi enviado a Jerusalém para estudar com Gamaliel (Atos 22:3).

Segundo Filipenses 3:5–6: "quanto à lei, fariseu; quanto ao zelo, perseguidor da Igreja; quanto à justiça que está na lei, irrepreensível." Ele não era um fariseu mediocre — era um zelote da tradição.

A conversão na estrada de Damasco (Atos 9) é narrada três vezes em Atos. A experiência reestruturou completamente sua teologia.

**Conexão bíblica:** Filipenses 3:4–11 — Paulo lista seus "ganhos" e os chama de "lixo" (σκύβαλα) comparados a Cristo.`,
    isPremium: true,
  },
  {
    id: 'H3-M01-U02',
    moduleId: 'H3-M01',
    unitOrder: 2,
    title: 'As três viagens missionárias',
    periodLabel: '~46–57 d.C.',
    locationLabel: 'Mediterrâneo oriental',
    keyFigure: 'Paulo',
    artifactNote: 'N/A',
    bibleConnection: 'Atos 13–21 — panorama',
    content: `Primeira viagem (~46–48 d.C.): Antioquia → Chipre → Ásia Menor. Fundação das primeiras igrejas gentias.

Segunda viagem (~49–52 d.C.): Ásia Menor → Macedônia (Filipos, Tessalônica, Bereia) → Grécia (Atenas, Corinto, 18 meses). As cartas aos Tessalonicenses são as mais antigas do NT.

Terceira viagem (~53–57 d.C.): Éfeso (3 anos), Macedônia, Corinto. As grandes cartas — 1 e 2 Coríntios, Gálatas, Romanos.

**Conexão bíblica:** Atos 16:9 — a visão do macedônio: "vem à Macedônia e ajuda-nos."`,
    isPremium: true,
  },
  {
    id: 'H3-M01-U03',
    moduleId: 'H3-M01',
    unitOrder: 3,
    title: 'As cartas: quando, de onde, para quem',
    periodLabel: '~50–65 d.C.',
    locationLabel: 'Diversas cidades do Império',
    keyFigure: 'Paulo',
    artifactNote: 'Papiro P46 (~200 d.C.) — 10 cartas de Paulo',
    artifactImage: '/artifacts/H3/photos/papyrus-p46.jpg',
    bibleConnection: '1 Coríntios 1:2 — "a igreja de Deus em Corinto"',
    content: `Paulo escreveu 13 cartas que o NT atribui a ele (7 são universalmente aceitas como paulinas). As cartas não são tratados abstratos — são respostas a situações concretas de igrejas reais.

| Carta | Data aprox. | De onde |
|-------|-------------|---------|
| 1 Tessalonicenses | ~50 d.C. | Corinto |
| Gálatas | ~48–55 d.C. | Síria ou Éfeso |
| 1 Coríntios | ~55 d.C. | Éfeso |
| Romanos | ~57 d.C. | Corinto |
| Filipenses | ~60–62 d.C. | Roma |

**Conexão bíblica:** 1 Coríntios 1:2 — "à igreja de Deus que está em Corinto." A carta começa localizando sua audiência.`,
    isPremium: true,
  },

  // H3-M02 — João
  {
    id: 'H3-M02-U01',
    moduleId: 'H3-M02',
    unitOrder: 1,
    title: 'João filho de Zebedeu: da Galileia a Éfeso',
    periodLabel: '~50–100 d.C.',
    locationLabel: 'Galileia, Éfeso',
    keyFigure: 'João, o apóstolo',
    artifactNote: 'N/A',
    bibleConnection: 'João 19:26–27 — "toma tua mãe"',
    content: `A tradição antiga registra que João viveu em Éfeso até idade avançada (~95–100 d.C.) e que Maria, a mãe de Jesus, foi com ele (baseado em João 19:27). Éfeso era a maior cidade da Ásia Menor — lar do Templo de Ártemis.

A "comunidade joanina" produziu o Evangelho de João, as três cartas de João e, segundo muitos, o Apocalipse. A comunidade tinha características teológicas distintas: ênfase no amor, na permanência, na identidade de Cristo como Logos.

**Conexão bíblica:** João 19:26–27 — no momento da crucificação, Jesus entrega sua mãe ao discípulo amado.`,
    isPremium: true,
  },
  {
    id: 'H3-M02-U02',
    moduleId: 'H3-M02',
    unitOrder: 2,
    title: 'O Evangelho de João: diferenças e teologia',
    periodLabel: '~80–95 d.C.',
    locationLabel: 'Éfeso',
    keyFigure: 'João',
    artifactNote: 'N/A',
    bibleConnection: 'João 1:1 — o Prólogo',
    content: `João é radicalmente diferente dos sinóticos. Não há parábolas. Em vez disso, longos discursos de Jesus e sete "sinais."

O Prólogo (João 1:1–18) é único — uma abertura filosófico-poética que situa Jesus na eternidade. João usa o conceito de Logos (razão criativa) da filosofia grega.

João 20:31 revela o propósito: "estas coisas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus."

**Conexão bíblica:** João 1:1–18 — o Prólogo que o aluno começou a decifrar no Ciclo I do grego.`,
    isPremium: true,
  },
  {
    id: 'H3-M02-U03',
    moduleId: 'H3-M02',
    unitOrder: 3,
    title: 'O Apocalipse: Patmos, as sete igrejas',
    periodLabel: '~81–96 d.C.',
    locationLabel: 'Patmos, Éfeso',
    keyFigure: 'João',
    artifactNote: 'N/A',
    bibleConnection: 'Apocalipse 1:9 — "eu João, vosso irmão"',
    content: `O Apocalipse foi escrito em Patmos — ilha no Mar Egeu a ~60 km de Éfeso, usada como local de exílio. João declara estar lá "por causa da palavra de Deus" (Apocalipse 1:9).

O contexto é o reinado de Domiciano (~81–96 d.C.), que exigiu adoração imperial com agressividade. As sete igrejas destinatárias eram todas na Ásia Menor.

O Apocalipse é literatura de resistência — linguagem codificada ("Babilônia" é Roma). Não era para ser lido como mapa do futuro, mas como carta pastoral.

**Conexão bíblica:** Apocalipse 1:9 e os capítulos 2–3 (as cartas às sete igrejas).`,
    isPremium: true,
  },

  // H3-M03 — Lucas e Atos
  {
    id: 'H3-M03-U01',
    moduleId: 'H3-M03',
    unitOrder: 1,
    title: 'Quem era Lucas e por que ele é único',
    periodLabel: '~60–85 d.C.',
    locationLabel: 'Antioquia, Roma',
    keyFigure: 'Lucas, o médico',
    artifactNote: 'N/A',
    bibleConnection: 'Lucas 1:1–4 — o prólogo histórico',
    content: `Lucas é identificado por Paulo em Colossenses 4:14 como "o médico amado" — único autor gentio identificado no NT. Seu grego é o mais literário do NT.

O prólogo de Lucas (1:1–4) é modelado nos prólogos de historiadores gregos como Tucídides: declaração de método, audiência específica (Teófilo), e propósito. Lucas não está escrevendo hagiografia — está escrevendo história.

**Conexão bíblica:** Lucas 1:1–4 — o prólogo mais explicito metodologicamente de qualquer Evangelho.`,
    isPremium: true,
  },
  {
    id: 'H3-M03-U02',
    moduleId: 'H3-M03',
    unitOrder: 2,
    title: 'Lucas–Atos como obra em dois volumes',
    periodLabel: '~60–85 d.C.',
    locationLabel: 'De Jerusalém a Roma',
    keyFigure: 'Lucas',
    artifactNote: 'N/A',
    bibleConnection: 'Atos 1:1–2 — "no primeiro livro"',
    content: `Lucas e Atos são dois volumes de uma única obra. Juntos, perfazem ~28% do NT — mais do que qualquer outro autor único.

A tese narrativa: o Espírito que desceu sobre Jesus em seu batismo é o mesmo que desce sobre os discípulos em Pentecostes e continua movendo a história.

**Conexão bíblica:** Lucas 4:18–21 — Jesus lê Isaías na sinagoga de Nazaré. Atos termina em Roma com Paulo pregando "sem impedimento" (Atos 28:31).`,
    isPremium: true,
  },
  {
    id: 'H3-M03-U03',
    moduleId: 'H3-M03',
    unitOrder: 3,
    title: 'Atos: a expansão de Jerusalém a Roma',
    periodLabel: '~60–85 d.C.',
    locationLabel: 'Todo o Mediterrâneo',
    keyFigure: 'Lucas',
    artifactNote: 'N/A',
    bibleConnection: 'Atos 1:8 — "até os confins da terra"',
    content: `Atos 1:8 fornece o índice geográfico da obra:
- Caps 1–7: Jerusalém
- Caps 8–12: Judeia, Samaria, Antioquia
- Caps 13–28: mundo mediterrâneo até Roma

Roma era literalmente o fim do mundo para um judeu — o centro do Império.

**Conexão bíblica:** Atos 28:30–31 — o final deliberadamente aberto. Paulo está em Roma, preso mas acessível, "pregando o Reino de Deus com toda a ousadia, sem impedimento."`,
    isPremium: true,
  },

  // H3-M04 — Marcos, Mateus e o Problema Sinótico
  {
    id: 'H3-M04-U01',
    moduleId: 'H3-M04',
    unitOrder: 1,
    title: 'Marcos: o mais antigo, o mais urgente',
    periodLabel: '~65–70 d.C.',
    locationLabel: 'Roma',
    keyFigure: 'Marcos, Pedro',
    artifactNote: 'N/A',
    bibleConnection: 'Marcos 1:1 — o começo',
    content: `Marcos é provavelmente o mais antigo dos Evangelhos e a principal fonte de Mateus e Lucas. É o mais curto, o mais urgente (usa "imediatamente" — εὐθύς — 41 vezes), e o mais cru literariamente.

Marcos é escrito para uma audiência gentio-romana — ele explica os costumes judaicos, traduz palavras aramaicas. A teoria mais aceita: escrito em Roma durante ou logo após o martírio de Pedro (~64–65 d.C.).

**Conexão bíblica:** Marcos 1:1 — "Princípio do evangelho de Jesus Cristo." Sem genealogia, sem nascimento — começa no meio da ação.`,
    isPremium: true,
  },
  {
    id: 'H3-M04-U02',
    moduleId: 'H3-M04',
    unitOrder: 2,
    title: 'Mateus: o Evangelho da Igreja',
    periodLabel: '~80–90 d.C.',
    locationLabel: 'Antioquia/Síria',
    keyFigure: 'Mateus',
    artifactNote: 'N/A',
    bibleConnection: 'Mateus 5:17 — "não vim revogar"',
    content: `Mateus usa ~90% do material de Marcos, mas o reorganiza e amplia. É o mais estruturado — cinco grandes discursos, possivelmente ecoando os cinco livros de Moisés.

Mateus escreve para uma audiência judaica — tem mais citações do AT. A frase "Reino dos Céus" (em vez de "Reino de Deus") reflete a reverência judaica.

**Conexão bíblica:** Mateus 5:17 — "não penseis que vim revogar a Lei ou os Profetas; não vim revogar, mas cumprir."`,
    isPremium: true,
  },
  {
    id: 'H3-M04-U03',
    moduleId: 'H3-M04',
    unitOrder: 3,
    title: 'O problema sinótico: por que três são parecidos?',
    periodLabel: '~65–90 d.C.',
    locationLabel: 'N/A',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'Marcos 4:35–41 e paralelos',
    content: `"Sinótico" vem do grego σύνοψις (visão de conjunto) — Mateus, Marcos e Lucas podem ser lidos em colunas paralelas.

A solução mais aceita (Hipótese das Duas Fontes): Mateus e Lucas usaram dois documentos independentes: Marcos (narrativas) e uma coleção de ditos chamada Q (de Quelle, "fonte" em alemão — nunca encontrada). Material próprio de Mateus é chamado M, próprio de Lucas é chamado L.

Isso não é ameaça à inspiração — é arqueologia literária.

**Conexão bíblica:** Marcos 4:35–41 (tempestade) lido ao lado de Mateus 8:23–27 e Lucas 8:22–25 — mesmo evento, perspectivas diferentes.`,
    isPremium: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO H4 — Como o NT Chegou Até Você (Premium)
  // ═══════════════════════════════════════════════════════════════

  // H4-M01 — Do Papiro ao Códice
  {
    id: 'H4-M01-U01',
    moduleId: 'H4-M01',
    unitOrder: 1,
    title: 'Materiais de escrita no século I',
    periodLabel: 'Século I d.C.',
    locationLabel: 'Alexandria, todo o Mediterrâneo',
    keyFigure: 'Tércio (escriba de Paulo)',
    artifactNote: 'Papiro P46 (~200 d.C.)',
    artifactImage: '/artifacts/H4/photos/papyrus-p46.jpg',
    bibleConnection: '2 João 12 — "não quis escrever com papel"',
    content: `O papiro era o suporte primário — feito do caule da planta Cyperus papyrus, cultivada no Egito. Relativamente barato, mas frágil ao umidade. Daí a preservação dos manuscritos egípcios.

As cartas de Paulo eram escritas em papiro e enviadas por portadores pessoais. O Papiro P46 (~200 d.C.) contém 10 cartas de Paulo.

Escribas profissionais (ἀμανουένσεις) eram frequentemente usados como ditadores. Romanos 16:22 menciona Tércio: "eu, Tércio, que escrevi esta carta." Paulo ditou; Tércio escreveu.

**Conexão bíblica:** 2 João 12 — "não quis fazê-lo por papel (χάρτης) e tinta (μέλαν)."`,
    isPremium: true,
  },
  {
    id: 'H4-M01-U02',
    moduleId: 'H4-M01',
    unitOrder: 2,
    title: 'A transição do rolo ao códice',
    periodLabel: 'Século I–IV d.C.',
    locationLabel: 'Alexandria, Roma',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: '2 Timóteo 4:13 — "os livros e os pergaminhos"',
    content: `O mundo greco-romano usava rolos (volumen). O códice (folhas dobradas e costuradas) era usado para rascunhos.

Os cristãos, de forma surpreendente e precoce (~século II), adotaram o códice para seus textos sagrados. A razão: permitia reunir múltiplos textos num único volume, era mais fácil de transportar.

O formato do seu NT — um livro com páginas — é uma invenção cristã primitiva.

**Conexão bíblica:** 2 Timóteo 4:13 — Paulo distingue βιβλία (papiro) e μεμβράνας (pergaminho de pele de animal).`,
    isPremium: true,
  },
  {
    id: 'H4-M01-U03',
    moduleId: 'H4-M01',
    unitOrder: 3,
    title: 'A cópia dos manuscritos',
    periodLabel: 'Século I–XV d.C.',
    locationLabel: 'Scriptoria monásticos',
    keyFigure: 'Copistas',
    artifactNote: 'N/A',
    bibleConnection: 'João 21:25 — "o mundo não comportaria os livros"',
    content: `Antes da imprensa (1450), cada cópia era feita à mão. As cópias eram feitas em scriptoria monásticos ou por copistas particulares.

Temos mais de 5.800 manuscritos gregos do NT (mais do que Homero ~650, César ~250), mas nenhum original. Diferem em ~400.000 pontos — a grande maioria variantes ortográficas insignificantes.

A crítica textual é a ciência de comparar manuscritos para reconstruir o texto mais próximo do original.

**Conexão bíblica:** João 7:53–8:11 (a mulher adúltera) e Marcos 16:9–20 são os maiores exemplos de passagens com suporte tardio.`,
    isPremium: true,
  },

  // H4-M02 — Cânon, Manuscritos e Tradução
  {
    id: 'H4-M02-U01',
    moduleId: 'H4-M02',
    unitOrder: 1,
    title: 'Como o cânon do NT foi formado',
    periodLabel: 'Século II–IV d.C.',
    locationLabel: 'Cartago, Hipona, Alexandria',
    keyFigure: 'Atanásio de Alexandria',
    artifactNote: 'Cânon de Muratori (~180 d.C.)',
    artifactImage: '/artifacts/H4/photos/muratorian-fragment.png',
    bibleConnection: '2 Pedro 3:15–16 — cartas de Paulo como "Escritura"',
    content: `O cânon não foi decidido por um único concílio. Foi um processo gradual de reconhecimento. Critérios: apostolicidade, uso amplo, consistência teológica.

O Cânon de Muratori (~180 d.C.) é a lista mais antiga. Atanásio, em 367 d.C., lista os 27 livros — a primeira vez completa. Concílios de Hipona (393) e Cartago (397) ratificaram.

**Conexão bíblica:** 2 Pedro 3:15–16 — Pedro se refere às cartas de Paulo como "Escrituras".`,
    isPremium: true,
  },
  {
    id: 'H4-M02-U02',
    moduleId: 'H4-M02',
    unitOrder: 2,
    title: 'Os grandes manuscritos: Sinaiticus e Vaticanus',
    periodLabel: 'Século IV d.C.',
    locationLabel: 'Sinai, Vaticano',
    keyFigure: 'Constantin Tischendorf',
    artifactNote: 'Codex Sinaiticus, Codex Vaticanus',
    artifactImage: '/artifacts/H4/photos/codex-sinaiticus.jpg',
    bibleConnection: 'Marcos 1:1 — variantes em "Filho de Deus"',
    content: `Codex Sinaiticus (~330–360 d.C.) — descoberto no mosteiro de Santa Catarina no Sinai por Tischendorf em 1844. Contém o NT completo.

Codex Vaticanus (~325–350 d.C.) — na Biblioteca do Vaticano desde pelo menos 1475. Junto com o Sinaiticus, forma a base do texto crítico grego moderno (NA28/UBS5).

**Conexão bíblica:** Marcos 1:1 — alguns manuscritos omitem "Filho de Deus". O Sinaiticus o inclui; alguns papiros não.`,
    isPremium: true,
  },
  {
    id: 'H4-M02-U03',
    moduleId: 'H4-M02',
    unitOrder: 3,
    title: 'Da LXX a Luther: 1.500 anos de tradução',
    periodLabel: 'Século II a.C. – XVI d.C.',
    locationLabel: 'Alexandria, Roma, Basileia',
    keyFigure: 'Jerônimo, Erasmo, Lutero',
    artifactNote: 'N/A',
    bibleConnection: 'Romanos 1:17 — "o justo viverá pela fé"',
    content: `A Septuaginta (LXX, ~250–150 a.C.) foi a Bíblia dos autores do NT.

Jerônimo traduziu para o latim (Vulgata, ~382–405 d.C.) — por mais de mil anos a Bíblia oficial do Ocidente.

Erasmo publicou o primeiro NT grego impresso (1516). Lutero o usou para traduzir o NT para o alemão (1522). A KJV (1611) usou o Textus Receptus. A ARA segue a mesma tradição.

O aluno que aprende grego no Koiné está aprendendo a língua que Erasmo quis que todos lessem — o sonho da Reforma.

**Conexão bíblica:** Romanos 1:17 — a frase que Lutero leu em grego e que mudou a história do Ocidente.`,
    isPremium: true,
  },

  // H4-M03 — A Septuaginta e o AT
  {
    id: 'H4-M03-U01',
    moduleId: 'H4-M03',
    unitOrder: 1,
    title: 'A Septuaginta: origem e importância',
    periodLabel: '250–150 a.C.',
    locationLabel: 'Alexandria',
    keyFigure: 'Os 70 sábios',
    artifactNote: 'N/A',
    bibleConnection: 'Atos 7:42 — Estêvão cita o AT em grego',
    content: `A Septuaginta (LXX — "setenta") é a tradução do AT hebraico para o grego, produzida em Alexandria para os judeus da diáspora que não liam mais hebraico.

A LXX não é uma tradução literal — é interpretativa. Paulo cita o AT quase sempre da LXX, não do hebraico.

**Conexão bíblica:** Atos 7 — Estêvão cita Gênesis 46:27 com o número 75 (LXX) em vez de 70 (hebraico). Os ouvintes reconheceriam a LXX.`,
    isPremium: true,
  },
  {
    id: 'H4-M03-U02',
    moduleId: 'H4-M03',
    unitOrder: 2,
    title: 'Como os autores do NT citam o AT',
    periodLabel: 'Século I d.C.',
    locationLabel: 'N/A',
    keyFigure: 'N/A',
    artifactNote: 'N/A',
    bibleConnection: 'Mateus 1:23 — Isaías 7:14 na LXX',
    content: `Os autores do NT usam o AT de formas que podem desconcertar o leitor moderno: cumprimento direto, tipologia, aplicação analógica, e pesher.

Mateus 1:23 cita Isaías 7:14 — em hebraico, עַלְמָה (almah = jovem mulher). A LXX traduziu por παρθένος (parthenos = virgem). Mateus usa a LXX.

**Conexão bíblica:** Mateus 1:22–23 e a cadeia de citações de cumprimento do AT ao longo de Mateus 1–2.`,
    isPremium: true,
  },
  {
    id: 'H4-M03-U03',
    moduleId: 'H4-M03',
    unitOrder: 3,
    title: 'Os Manuscritos do Mar Morto',
    periodLabel: '250 a.C. – 68 d.C.',
    locationLabel: 'Qumran',
    keyFigure: 'Essênios',
    artifactNote: 'Jarros de barro de Qumran, Rolo de Isaías',
    artifactImage: '/artifacts/H4/photos/isaiah-scroll.jpg',
    bibleConnection: 'Lucas 4:17–19 — Jesus lê Isaías',
    content: `Em 1947, um pastor beduíno encontrou os Manuscritos do Mar Morto em Qumran — escondidos pelos essênios antes da chegada dos romanos. Fragmentos de quase todos os livros do AT — mil anos mais antigos do que qualquer manuscrito hebraico anterior.

O Rolo de Isaías (~150 a.C.) é virtualmente idêntico ao texto hebraico medieval — 1.000 anos de cópia com diferenças mínimas.

**Conexão bíblica:** Lucas 4:17–19 — Jesus recebe o rolo de Isaías na sinagoga. O mesmo texto estudado em Qumran a poucos quilômetros.`,
    isPremium: true,
  },
];

export function getUnitsByModule(moduleId: string): HistoryUnit[] {
  return HISTORY_UNITS.filter((u) => u.moduleId === moduleId);
}

export function getUnitById(unitId: string): HistoryUnit | undefined {
  return HISTORY_UNITS.find((u) => u.id === unitId);
}
