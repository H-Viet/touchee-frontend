"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Me, User } from "@/types";
import { tokenStorage } from "@/lib/api/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setUser: (me: Me) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      setUser: (me: Me) => set({ user: me.user, isAuthenticated: true }),

      logout: () => {
        tokenStorage.clear();
        set({ user: null, isAuthenticated: false });
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "touchee_auth",
      // Only persist these two fields — isHydrated is runtime only
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
