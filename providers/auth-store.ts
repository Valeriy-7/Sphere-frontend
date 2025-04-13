import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  authToken: string | null;
  userId: string | null;
  activeCabinetId: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userId: string, cabinetId: string, email: string) => void;
  clearAuth: () => void;
  setActiveCabinet: (cabinetId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authToken: null,
      userId: null,
      activeCabinetId: null,
      userEmail: null,
      isAuthenticated: false,

      setAuth: (token: string, userId: string, cabinetId: string, email: string) =>
        set({
          authToken: token,
          userId,
          activeCabinetId: cabinetId,
          userEmail: email,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          authToken: null,
          userId: null,
          activeCabinetId: null,
          userEmail: null,
          isAuthenticated: false,
        }),

      setActiveCabinet: (cabinetId: string) =>
        set({
          activeCabinetId: cabinetId,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state: AuthState) => ({
        authToken: state.authToken,
        userId: state.userId,
        activeCabinetId: state.activeCabinetId,
        userEmail: state.userEmail,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
