// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { onAuthChange } from '@/services/auth';
import { getUserProgress } from '@/services/firestore';

export const useAuth = () => {
  const { user, isLoading, setUser, setProgress, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          isPremium: false,
          trialEndsAt: null,
          createdAt: new Date(firebaseUser.metadata.creationTime ?? Date.now()),
        };
        setUser(userData);

        const progress = await getUserProgress(firebaseUser.uid);
        setProgress(progress);
      } else {
        setUser(null);
        setProgress(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
  };
};
