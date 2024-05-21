import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IUser from "../interfaces/User";

interface UserStore {
  user: IUser | null;
  error: AxiosError | null;
  loading: boolean;
  fetchUser: (jwt?: string) => Promise<void>;
  getJwt: () => Promise<string | null>;
  setJwt: (jwt: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  error: null,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        error: new AxiosError("jwt token not in secure store"),
        loading: false,
      });
    }

    await axios({
      url: "/api/user",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
    })
      .then(async (response) => {
        set({
          user: {
            id: response.data.guid,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            description: response.data.description,
            dateOfBirth: new Date(response.data.dateOfBirth),
            isAdmin: response.data.isAdmin,
            isOrganizer: response.data.isOrganizer,
            emailNotifications: response.data.emailNotifications,
            profilePicture: null, // TODO: this property will be implemented to backend in the future
          },
          error: null,
        });
      })
      .catch((error: AxiosError) => {
        set({ user: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  getJwt: async () => {
    return await SecureStore.getItemAsync("jwt");
  },
  setJwt: async (jwt: string) => {
    return await SecureStore.setItemAsync("jwt", jwt);
  },
}));
