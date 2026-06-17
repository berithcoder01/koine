// src/services/auth.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuthStore } from '@/features/auth/authStore';
import { useProgressStore, type ProgressState } from '@/features/progress/progressStore';
import { useGamificationStore, type GamificationState } from '@/features/gamification/gamificationStore';
import type { User, UserProgress } from '@/core/types/user.types';
import { Capacitor } from '@capacitor/core';

function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    isPremium: false,
    trialEndsAt: null,
    createdAt: new Date(firebaseUser.metadata.creationTime ?? Date.now()),
  };
}

export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProgress;
}

async function createUserProgress(uid: string): Promise<UserProgress> {
  const progress: UserProgress = {
    uid,
    currentCycle: 1,
    currentUnit: 1,
    currentLesson: 1,
    streakDays: 0,
    streakRecord: 0,
    lastStudyDate: null,
    totalXP: 0,
    weeklyXP: 0,
    streakFreezes: 0,
    leagueLevel: 'bronze',
    completedUnits: [],
    completedLessons: [],
    completedHistoryUnits: [],
    completedVocabUnits: [],
    completedCanvasLetters: [],
    unlockedVerses: [],
    trophyProgress: {},
  };
  await setDoc(doc(db, 'users', uid), { ...progress, createdAt: serverTimestamp() });
  return progress;
}

export async function signInWithEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const userData = mapFirebaseUser(user);
  const progress = await getUserProgress(user.uid);
  useAuthStore.getState().setUser(userData);
  useAuthStore.getState().setProgress(progress);
  return { user: userData, progress };
}

export async function signUpWithEmail(email: string, password: string, displayName?: string) {
  console.log('[Auth] signUpWithEmail: starting for', email);
  let user;
  try {
    ({ user } = await createUserWithEmailAndPassword(auth, email, password));
  } catch (err) {
    console.error('[Auth] signUpWithEmail: createUserWithEmailAndPassword failed:', err);
    throw err;
  }
  console.log('[Auth] signUpWithEmail: user created:', user.uid);
  if (displayName) {
    try {
      await updateProfile(user, { displayName });
    } catch (profileErr) {
      console.warn('[Auth] signUpWithEmail: updateProfile failed:', profileErr);
    }
  }
  try {
    await sendEmailVerification(user);
  } catch (verifyErr) {
    console.warn('[Auth] signUpWithEmail: sendEmailVerification failed:', verifyErr);
  }
  const userData = mapFirebaseUser(user);
  let progress;
  try {
    progress = await createUserProgress(user.uid);
  } catch (progressErr) {
    console.error('[Auth] signUpWithEmail: createUserProgress failed:', progressErr);
    progress = {
      uid: user.uid, currentCycle: 1, currentUnit: 1, currentLesson: 1,
      streakDays: 0, streakRecord: 0, lastStudyDate: null, totalXP: 0,
      weeklyXP: 0, streakFreezes: 0, leagueLevel: 'bronze' as const,
      completedUnits: [], completedLessons: [],
      completedHistoryUnits: [], completedVocabUnits: [], completedCanvasLetters: [],
      unlockedVerses: [], trophyProgress: {},
    };
  }
  useAuthStore.getState().setUser(userData);
  useAuthStore.getState().setProgress(progress);
  return { user: userData, progress };
}

export async function signInWithGoogle() {
  if (Capacitor.isNativePlatform()) {
    console.log('[Auth] signInWithGoogle: starting native flow');
    const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
    let result;
    try {
      result = await FirebaseAuthentication.signInWithGoogle();
    } catch (nativeErr) {
      console.error('[Auth] signInWithGoogle: native plugin failed:', nativeErr);
      throw new Error(`Google sign-in failed (native): ${nativeErr}`);
    }
    if (!result.credential) {
      console.error('[Auth] signInWithGoogle: no credential returned from native plugin');
      throw new Error('Google sign-in failed: no credential returned');
    }
    console.log('[Auth] signInWithGoogle: got credential, exchanging with Firebase');
    const { signInWithCredential, GoogleAuthProvider } = await import('firebase/auth');
    const credential = GoogleAuthProvider.credential(result.credential.idToken ?? null);
    let user;
    try {
      ({ user } = await signInWithCredential(auth, credential));
    } catch (credErr) {
      console.error('[Auth] signInWithGoogle: signInWithCredential failed:', credErr);
      throw new Error(`Google sign-in failed (credential exchange): ${credErr}`);
    }
    console.log('[Auth] signInWithGoogle: credential exchanged, user:', user.uid);
    const userData = mapFirebaseUser(user);
    let progress;
    try {
      const existing = await getUserProgress(user.uid);
      progress = existing ?? await createUserProgress(user.uid);
    } catch (progressErr) {
      console.error('[Auth] signInWithGoogle: progress load/create failed:', progressErr);
      progress = {
        uid: user.uid, currentCycle: 1, currentUnit: 1, currentLesson: 1,
        streakDays: 0, streakRecord: 0, lastStudyDate: null, totalXP: 0,
        weeklyXP: 0, streakFreezes: 0, leagueLevel: 'bronze' as const,
        completedUnits: [], completedLessons: [],
        completedHistoryUnits: [], completedVocabUnits: [], completedCanvasLetters: [],
        unlockedVerses: [], trophyProgress: {},
      };
    }
    useAuthStore.getState().setUser(userData);
    useAuthStore.getState().setProgress(progress);
    return { user: userData, progress };
  }

  const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);
  const userData = mapFirebaseUser(user);
  const existing = await getUserProgress(user.uid);
  const progress = existing ?? await createUserProgress(user.uid);
  useAuthStore.getState().setUser(userData);
  useAuthStore.getState().setProgress(progress);
  return { user: userData, progress };
}

const RESET_PROGRESS: Partial<ProgressState> = {
  completedLessons: {},
  completedUnits: [],
  currentCycle: 1,
  currentUnit: 1,
  currentLesson: 1,
};

const RESET_GAMIFICATION: Partial<GamificationState> = {
  totalXP: 0,
  weeklyXP: 0,
  streakDays: 0,
  lastStudyDate: null,
  leagueLevel: 'bronze',
  achievements: [],
  unlockedVerses: [],
  trophyProgress: {},
};

export async function signOut() {
  if (Capacitor.isNativePlatform()) {
    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      await FirebaseAuthentication.signOut();
    } catch {}
  }
  await firebaseSignOut(auth);
  localStorage.removeItem('koine-progress');
  localStorage.removeItem('koine-gamification');
  localStorage.removeItem('koine-canvas-completed');
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setProgress(null);
  useProgressStore.setState(RESET_PROGRESS);
  useGamificationStore.setState(RESET_GAMIFICATION);
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

