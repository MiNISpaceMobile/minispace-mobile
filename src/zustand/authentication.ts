import { create } from "zustand";

interface AuthenticationState {
  user: boolean | null;
  jwt: string | null;
  fetchToken: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>(
  (set, get) => ({
    user: null,
    jwt: null,
    fetchToken: () => {},
  }),
);
