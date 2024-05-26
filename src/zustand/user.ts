import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IUser from "../interfaces/User";

interface UserStore {
  user: IUser | null;
  error: AxiosError | null;
  loading: boolean;
  fetchUser: (jwt?: string) => Promise<void>;
  clearUser: () => void;
  updateUser: (user: IUser) => Promise<void>;
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
            profilePicture: response.data.profilePictureUrl,
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
  clearUser: () => {
    set({ user: null });
  },
  updateUser: async (user: IUser) => {
    const originalUser = get().user;
    if (!originalUser) {
      return;
    }

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
      method: "put",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      data: { emailNotifications: !user.emailNotifications },
    })
      .then(async (response) => {
        set({
          user: {
            ...originalUser,
            emailNotifications: response.data.emailNotifications,
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
}));
