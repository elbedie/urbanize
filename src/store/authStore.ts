import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "citizen" | "manager") => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      login: async (email, password) => {
        set({ loading: true });
        const { user, token } = await authService.login({ email, password });
        set({ user, token, loading: false });
      },
      register: async (name, email, password, role) => {
        set({ loading: true });
        const { user, token } = await authService.register({ name, email, password, role });
        set({ user, token, loading: false });
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "urbanize-auth",
    }
  )
);
