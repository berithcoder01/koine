// src/services/firestore.ts
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProgress } from '@/types/user.types';

const userDoc = (uid: string) => doc(db, 'users', uid);

export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const snap = await getDoc(userDoc(uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProgress;
}

export async function saveUserProgress(uid: string, data: Partial<UserProgress>) {
  await updateDoc(userDoc(uid), { ...data, updatedAt: serverTimestamp() });
}

export async function createUserDocument(uid: string, data: Partial<UserProgress>) {
  await setDoc(userDoc(uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
