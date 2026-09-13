import { env } from "../config/env";

const backendUrl = env.backendUrl;

export const apiClient = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    `${backendUrl}${path}`,
    {
      ...options,
      headers,
    },
  );

  if (response.status === 401) {
    localStorage.removeItem("token");

    window.location.href = "/login";

    throw new Error("Authentication required");
  }

  return response;
};