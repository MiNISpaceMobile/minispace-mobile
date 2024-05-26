import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthStore {
  authVisible: boolean;
  setAuthVisible: (authVisible: boolean) => void;
  getJwt: () => Promise<string | null>;
  setJwt: (jwt: string) => Promise<void>;
  deleteJwt: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authVisible: true,
  setAuthVisible: (authVisible: boolean) => {
    set({ authVisible });
  },
  getJwt: async () => {
    return await SecureStore.getItemAsync("jwt");
  },
  setJwt: async (jwt: string) => {
    return await SecureStore.setItemAsync("jwt", jwt);
  },
  deleteJwt: async () => {
    return await SecureStore.deleteItemAsync("jwt");
  },
}));
