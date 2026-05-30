// src/services/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';
import { FIREBASE_CONFIG } from '@/constants/config';
import { Capacitor } from '@capacitor/core';

const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

let auth: any;

try {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
} catch {
  auth = getAuth(app);
}

export { auth };

export const db = getFirestore(app);

export let messaging: ReturnType<typeof getMessaging> | null = null;

isSupported().then((supported) => {
  if (supported && Capacitor.isNativePlatform() === false) {
    messaging = getMessaging(app);
  }
});

export { app };
