import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IOrganizedEvent from "../interfaces/OrganizedEvent";

interface OrganizedEventState {
  events: IOrganizedEvent[];
  error: AxiosError | null;
  loading: boolean;
  refresh: () => void;
  fetchEvents: () => void;
}

export const useOrganizedEventsStore = create<OrganizedEventState>(
  (set, get) => ({
    events: [] as IOrganizedEvent[],
    error: null,
    loading: false,
    refresh: () => {
      set({ events: [] });
    },
    fetchEvents: async () => {
      set({ loading: true });

      const jwt = await SecureStore.getItemAsync("jwt");

      if (!jwt) {
        set({
          error: new AxiosError("jwt token not in secure store"),
          loading: false,
        });
      }

      axios({
        url: "/events",
        method: "get",
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        headers: { Authorization: "Bearer " + jwt },
        params: {
          Start: 0,
          Limit: 100,
          OrganizedByMe: true,
        },
      })
        .then((response) => {
          set((state) => ({
            events: response.data.results.$values.map((eventItem: any) => {
              return {
                _id: eventItem.guid,
                value: eventItem.title,
              };
            }),
            error: null,
          }));
        })
        .catch((error: AxiosError) => {
          set({ events: [], error });
        })
        .finally(() => {
          set({ loading: false });
        });
    },
  }),
);
