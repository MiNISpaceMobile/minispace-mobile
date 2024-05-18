import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IEventDetails from "../interfaces/EventDetails";

interface EventDetailsState {
  eventDetails: IEventDetails | null;
  error: AxiosError | null;
  loading: boolean;
  fetchEventDetails: (id: string) => void;
}

export const useEventDetailsStore = create<EventDetailsState>((set, get) => ({
  eventDetails: null,
  error: null,
  loading: false,
  fetchEventDetails: async (id: string) => {
    set({ loading: true, eventDetails: null });

    axios({
      url: `/events/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    })
      .then((response) => {
        set({ eventDetails: response.data.eventDetails, error: null });
      })
      .catch((error: AxiosError) => {
        set({ eventDetails: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
