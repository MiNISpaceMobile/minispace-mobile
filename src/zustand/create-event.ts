import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IEventCreator from "../interfaces/EventCreator";

interface CreateEventState {
  loading: boolean;
  error: AxiosError | null;
  createEvent: (eventCreator: IEventCreator) => Promise<void>;
}

export const useCreateEventStore = create<CreateEventState>((set, get) => ({
  loading: false,
  error: null,
  createEvent: async (eventCreator: IEventCreator) => {
    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        error: new AxiosError("jwt token not in secure store"),
        loading: false,
      });
    }

    await axios({
      url: `/events/create`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      data: {
        ...eventCreator,
        eventCategory: 0, // event category is not used, but need to be passed (will be removed in the future)
      },
    })
      .then((response) => {
        set({ error: null });
      })
      .catch((error: AxiosError) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
