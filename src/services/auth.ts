// src/services/auth.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuthStore } from '@/store/authStore';
import type { User, UserProgress } from '@/types/user.types';
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

async function getUserProgress(uid: string): Promise<UserProgress | null> {
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
    unlockedVerses: [],
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
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  const userData = mapFirebaseUser(user);
  const progress = await createUserProgress(user.uid);
  useAuthStore.getState().setUser(userData);
  useAuthStore.getState().setProgress(progress);
  return { user: userData, progress };
}

export async function signInWithGoogle() {
  if (Capacitor.isNativePlatform()) {
    const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
    const result = await FirebaseAuthentication.signInWithGoogle();
    if (!result.credential) {
      throw new Error('Google sign-in failed: no credential returned');
    }
    const { signInWithCredential, GoogleAuthProvider } = await import('firebase/auth');
    const credential = GoogleAuthProvider.credential(result.credential.idToken ?? null);
    const { user } = await signInWithCredential(auth, credential);
    const userData = mapFirebaseUser(user);
    const existing = await getUserProgress(user.uid);
    const progress = existing ?? await createUserProgress(user.uid);
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

export async function signOut() {
  if (Capacitor.isNativePlatform()) {
    try {
      const { FirebaseAuthentication } = await import('@capacitor-firebase/authentication');
      await FirebaseAuthentication.signOut();
    } catch {}
  }
  await firebaseSignOut(auth);
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setProgress(null);
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
