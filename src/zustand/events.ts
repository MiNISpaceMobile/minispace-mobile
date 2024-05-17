import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IEvent from "../interfaces/Event";
import EventFilters from "../interfaces/EventFilters";

interface EventState {
  events: IEvent[];
  error: AxiosError | null;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchEvents: (filters: EventFilters) => void;
}

export const useEventsStore = create<EventState>((set, get) => ({
  events: [] as IEvent[],
  error: null,
  loading: false,
  page: 0,
  isLastPage: false,
  refresh: () => {
    set({ events: [], page: 0, isLastPage: false });
  },
  fetchEvents: async (filters: EventFilters) => {
    if (get().isLastPage) {
      return;
    }

    set({ loading: true });

    axios({
      url: "/events",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      // TODO: pass filters to params
      params: { page: get().page },
    })
      .then((response) => {
        set((state) => ({
          events: state.events.concat(response.data.events),
          error: null,
          page: state.page + 1,
          isLastPage: response.data.isLastPage,
        }));
      })
      .catch((error: AxiosError) => {
        set({ events: [], error, page: 0, isLastPage: false });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
