// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/authStore';
import { onAuthChange } from '@/features/auth/auth';
import { getUserProgress } from '@/features/auth/auth';

export const useAuth = () => {
  const { user, isLoading, setUser, setProgress, setAvatarId, setLoading } = useAuthStore();

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

        try {
          const progress = await getUserProgress(firebaseUser.uid);
          setProgress(progress);
          setAvatarId(progress?.avatarId ?? null);
        } catch (err) {
          console.warn('[useAuth] Could not load user progress (will retry on next load):', err);
          setProgress(null);
          setAvatarId(null);
        }
      } else {
        setUser(null);
        setProgress(null);
        setAvatarId(null);
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
