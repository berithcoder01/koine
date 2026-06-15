export interface AvatarOption {
  id: string;
  letter: string;
  letterName: string;
  imagePath: string;
  imageSmPath: string;
}

export const AVATARS: AvatarOption[] = [
  { id: 'A1',  letter: 'Φ', letterName: 'Phi',    imagePath: '/avatars/A1.webp',   imageSmPath: '/avatars/A1_sm.webp'   },
  { id: 'A2',  letter: 'Ο', letterName: 'Omicron',imagePath: '/avatars/A2.webp',   imageSmPath: '/avatars/A2_sm.webp'   },
  { id: 'A3',  letter: 'α', letterName: 'Alpha',  imagePath: '/avatars/A3.webp',   imageSmPath: '/avatars/A3_sm.webp'   },
  { id: 'A4',  letter: 'Π', letterName: 'Pi',     imagePath: '/avatars/A4.webp',   imageSmPath: '/avatars/A4_sm.webp'   },
  { id: 'A5',  letter: 'Σ', letterName: 'Sigma',  imagePath: '/avatars/A5.webp',   imageSmPath: '/avatars/A5_sm.webp'   },
  { id: 'A6',  letter: 'α', letterName: 'Alpha',  imagePath: '/avatars/A6.webp',   imageSmPath: '/avatars/A6_sm.webp'   },
  { id: 'A7',  letter: 'Β', letterName: 'Beta',   imagePath: '/avatars/A7.webp',   imageSmPath: '/avatars/A7_sm.webp'   },
  { id: 'A8',  letter: 'Δ', letterName: 'Delta',  imagePath: '/avatars/A8.webp',   imageSmPath: '/avatars/A8_sm.webp'   },
  { id: 'A9',  letter: 'Π', letterName: 'Pi',     imagePath: '/avatars/A9.webp',   imageSmPath: '/avatars/A9_sm.webp'   },
  { id: 'A10', letter: 'Η', letterName: 'Eta',    imagePath: '/avatars/A10.webp',  imageSmPath: '/avatars/A10_sm.webp'  },
  { id: 'A11', letter: 'Σ', letterName: 'Sigma',  imagePath: '/avatars/A11.webp',  imageSmPath: '/avatars/A11_sm.webp'  },
];

export const AVATAR_IDS = AVATARS.map(a => a.id);

export function getAvatarById(id: string): AvatarOption | undefined {
  return AVATARS.find(a => a.id === id);
}
