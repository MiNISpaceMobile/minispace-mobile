import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IOrganizedEvent from "../interfaces/OrganizedEvent";

interface OrganizedEventState {
  events: IOrganizedEvent[];
  error: AxiosError | null;
  loading: boolean;
  isLastPage: boolean;
  refresh: () => void;
  fetchEvents: () => void;
}

export const useOrganizedEventsStore = create<OrganizedEventState>(
  (set, get) => ({
    events: [] as IOrganizedEvent[],
    error: null,
    loading: false,
    isLastPage: false,
    refresh: () => {
      set({ events: [], isLastPage: false });
    },
    fetchEvents: async () => {
      if (get().isLastPage) {
        return;
      }

      set({ loading: true });

      axios({
        url: "/events",
        method: "get",
        baseURL: process.env.EXPO_PUBLIC_API_URL,
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
            isLastPage: response.data.paging.last,
          }));
        })
        .catch((error: AxiosError) => {
          set({ events: [], error, isLastPage: false });
        })
        .finally(() => {
          set({ loading: false });
        });
    },
  }),
);
