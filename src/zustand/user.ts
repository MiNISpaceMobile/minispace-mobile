import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface UserStore {
  getJwt: () => Promise<string | null>;
  setJwt: (jwt: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  getJwt: async () => {
    return await SecureStore.getItemAsync("jwt");
  },
  setJwt: async (jwt: string) => {
    return await SecureStore.setItemAsync("jwt", jwt);
  },
}));
