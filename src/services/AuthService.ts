import { env } from "../config/env";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/Auth";

const backendUrl = env.backendUrl;

export const AuthService = {

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(
      `${backendUrl}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.accessToken);

    return data;
  },

  async register(
    payload: RegisterPayload
  ): Promise<RegisterResponse> {
    const response = await fetch(
      `${backendUrl}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  logout(): void {
    localStorage.removeItem("token");
  },
};