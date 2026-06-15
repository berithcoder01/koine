// src/content/history/history-blocks.ts
import type { HistoryBlockInfo } from '@/core/types/history.types';

export const HISTORY_BLOCKS: HistoryBlockInfo[] = [
  {
    id: 'H1',
    title: 'O Mundo Que Viu Jesus Nascer',
    subtitle: 'Bloco H1',
    description: 'O Mediterrâneo, Roma, Palestina e os grupos religiosos do século I.',
    trophyVerse: 'Ἐγένετο δὲ ἐν ταῖς ἡμέραις ἐκείναις ἐξῆλθεν δόγμα παρὰ Καίσαρος Αὐγούστου ἀπογράφεσθαι πᾶσαν τὴν οἰκουμένην.',
    trophyReference: 'Lucas 2:1',
    isPremium: false,
    moduleIds: ['H1-M01', 'H1-M02', 'H1-M03', 'H1-M04'],
    metaGoal: 'Situar os atores do NT no mapa político do século I.',
  },
  {
    id: 'H2',
    title: 'Jerusalém: A Cidade e o Templo',
    subtitle: 'Bloco H2',
    description: 'Topografia, arquitetura, a semana da Páscoa e os caminhos de Jesus.',
    trophyVerse: 'ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτοῖς· λύσατε τὸν ναὸν τοῦτον καὶ ἐν τρισὶν ἡμέραις ἐγερῶ αὐτόν.',
    trophyReference: 'João 2:19',
    isPremium: false,
    moduleIds: ['H2-M01', 'H2-M02', 'H2-M03', 'H2-M04'],
    metaGoal: 'Imaginar Jerusalém no século I e entender a destruição do Templo.',
  },
  {
    id: 'H3',
    title: 'Os Escritores e os Textos',
    subtitle: 'Bloco H3',
    description: 'Paulo, João, Lucas, Marcos, Mateus — seus contextos e suas obras.',
    trophyVerse: 'πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν...',
    trophyReference: '2 Timóteo 3:16',
    isPremium: true,
    moduleIds: ['H3-M01', 'H3-M02', 'H3-M03', 'H3-M04'],
    metaGoal: 'Conhecer quem escreveu os livros do NT e por que isso importa.',
  },
  {
    id: 'H4',
    title: 'Como o NT Chegou Até Você',
    subtitle: 'Bloco H4',
    description: 'Papiro, cópia, cânon, manuscritos e tradução ao longo de 2.000 anos.',
    trophyVerse: 'οὐ γὰρ θελήματι ἀνθρώπου ἠνέχθη ποτε προφητεία, ἀλλὰ ὑπὸ πνεύματος ἁγίου φερόμενοι ἐλάλησαν ἀπὸ θεοῦ ἄνθρωποι.',
    trophyReference: '2 Pedro 1:21',
    isPremium: true,
    moduleIds: ['H4-M01', 'H4-M02', 'H4-M03'],
    metaGoal: 'Entender como um texto do século I chegou até sua Bíblia.',
  },
];

export const HISTORY_TOTAL_XP = 930;
export const HISTORY_TOTAL_MODULES = 15;
