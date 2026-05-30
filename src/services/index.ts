// src/services/index.ts
export { app, auth, db, messaging } from './firebase';
export {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  onAuthChange,
} from './auth';
export {
  getUserProgress,
  saveUserProgress,
  createUserDocument,
} from './firestore';
