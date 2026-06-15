// src/services/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { FIREBASE_CONFIG, RECAPTCHA_SITE_KEY } from '@/core/constants/config';
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

// ── App Check (reCAPTCHA v3) ────────────────────────────────────
// Protege contra abuso de API: rate limiting, bots, scripts automatizados.
// Em dev sem reCAPTCHA key, falha silenciosamente.
// NOTA: ReCaptchaV3 não funciona em plataformas nativas (Android/iOS).
// App Check nativo requer PlayIntegrity (Android) ou DeviceCheck (iOS)
// configurado diretamente no Firebase Console, não via JS SDK.
// Em native, pulamos o App Check para não bloquear auth/firestore.
try {
  if (!Capacitor.isNativePlatform() && window.location.hostname !== 'localhost') {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  }
} catch (e) {
  console.warn('[AppCheck] Init skipped:', e);
}

export let messaging: ReturnType<typeof getMessaging> | null = null;

isSupported().then((supported) => {
  if (supported && Capacitor.isNativePlatform() === false) {
    messaging = getMessaging(app);
  }
});

export { app };
