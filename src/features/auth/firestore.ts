import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/features/auth/firebase';
import type { UserProgress } from '@/core/types/user.types';
import { AVATAR_IDS } from '@/content/avatars';

const SAFE_RANGES = {
  totalXP:       { min: 0, max: 500_000 },
  weeklyXP:      { min: 0, max: 5_000 },
  streakDays:    { min: 0, max: 3_650 },
  streakRecord:  { min: 0, max: 3_650 },
  streakFreezes: { min: 0, max: 30 },
} as const;

const VALID_LEAGUES = ['bronze', 'prata', 'ouro', 'diamante'] as const;

const MAX_ARRAY_LENGTHS: Record<string, number> = {
  completedUnits:   200,
  completedLessons: 1000,
  unlockedVerses:   500,
  achievements:     100,
  trophyProgress:   20,
};

function sanitize(data: Partial<UserProgress>): Partial<UserProgress> {
  const out: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(data)) {
    if (val === undefined) continue;

    const range = SAFE_RANGES[key as keyof typeof SAFE_RANGES];
    if (range) {
      const num = Number(val);
      out[key] = Number.isFinite(num) ? Math.max(range.min, Math.min(range.max, Math.round(num))) : range.min;
      continue;
    }

    if (key === 'leagueLevel') {
      out[key] = VALID_LEAGUES.includes(val as typeof VALID_LEAGUES[number]) ? val : 'bronze';
      continue;
    }

    if (key === 'avatarId') {
      out[key] = AVATAR_IDS.includes(val as string) ? val : null;
      continue;
    }

    const maxLen = MAX_ARRAY_LENGTHS[key];
    if (maxLen && Array.isArray(val)) {
      out[key] = val.slice(0, maxLen);
      continue;
    }

    out[key] = val;
  }

  return out as Partial<UserProgress>;
}

export async function saveUserProgress(uid: string, data: Partial<UserProgress>): Promise<void> {
  const safe = sanitize(data);
  await setDoc(doc(db, 'users', uid), { ...safe, updatedAt: serverTimestamp() }, { merge: true });
}
