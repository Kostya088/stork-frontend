import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
  setInitialized: () => {
    set(() => ({ isInitializing: false }));
  },
}));
