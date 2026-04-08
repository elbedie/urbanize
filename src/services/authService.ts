import { api } from "./api";
import { AuthResponse } from "@/types/auth";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  role: "citizen" | "manager";
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },
  async me(token: string) {
    const { data } = await api.get<AuthResponse["user"]>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
