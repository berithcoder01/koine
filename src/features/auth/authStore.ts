// src/store/authStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { User, UserProgress } from '@/core/types/user.types';

interface AuthState {
  user: User | null;
  progress: UserProgress | null;
  avatarId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  setAvatarId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    progress: null,
    avatarId: null,
    isLoading: true,
    isAuthenticated: false,

    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = user !== null;
        state.isLoading = false;
      }),

    setProgress: (progress) =>
      set((state) => {
        state.progress = progress;
      }),

    setAvatarId: (id) =>
      set((state) => {
        state.avatarId = id;
      }),

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),
  }))
);
