import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IOrganizedEvent from "../interfaces/OrganizedEvent";

interface OrganizedEventState {
  events: IOrganizedEvent[];
  error: AxiosError | null;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchEvents: () => void;
}

export const useOrganizedEventsStore = create<OrganizedEventState>(
  (set, get) => ({
    events: [] as IOrganizedEvent[],
    error: null,
    loading: false,
    page: 0,
    isLastPage: false,
    refresh: () => {
      set({ events: [], page: 0, isLastPage: false });
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
          Start: get().page,
          Limit: 100,
          organizedByMe: true,
        },
      })
        .then((response) => {
          set((state) => ({
            events: state.events.concat(
              response.data.results.$values.map((eventItem: any) => {
                return {
                  _id: eventItem.guid,
                  value: eventItem.title,
                };
              }),
            ),
            error: null,
            page: state.page + 1,
            isLastPage: response.data.paging.last,
          }));
        })
        .catch((error: AxiosError) => {
          set({ events: [], error, page: 0, isLastPage: false });
        })
        .finally(() => {
          set({ loading: false });
        });
    },
  }),
);
