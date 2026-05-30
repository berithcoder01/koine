// src/types/firebase.d.ts
declare module 'firebase/app' {
  export function initializeApp(config: any): any;
  export function getApps(): any[];
  export function getApp(): any;
}

declare module 'firebase/auth' {
  export function getAuth(app?: any): any;
  export function initializeAuth(app: any, config?: any): any;
  export const browserLocalPersistence: any;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<{ user: any }>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<{ user: any }>;
  export function signInWithPopup(auth: any, provider: any): Promise<{ user: any }>;
  export function signInWithCredential(auth: any, credential: any): Promise<{ user: any }>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, callback: (user: any) => void): () => void;
  export function updateProfile(user: any, data: { displayName?: string; photoURL?: string }): Promise<void>;
  export class GoogleAuthProvider {
    constructor();
    static credential(idToken: string | null, accessToken?: string | null): any;
  }
  export type User = any;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(db: any, ...pathSegments: string[]): any;
  export function getDoc(ref: any): Promise<any>;
  export function setDoc(ref: any, data: any, options?: any): Promise<void>;
  export function updateDoc(ref: any, data: any): Promise<void>;
  export function serverTimestamp(): any;
}

declare module 'firebase/messaging' {
  export function getMessaging(app?: any): any;
  export function isSupported(): Promise<boolean>;
}
