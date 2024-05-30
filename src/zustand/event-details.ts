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
      .then(async (response) => {
        const data = await response.data;
        set({
          eventDetails: {
            id: data.guid,
            description: data.description,
            imageURI: data.pictureUrls.$values[0],
            eventTitle: data.title,
            participants: data.participantCount,
            friends: [], // TODO: add friend list (waiting for backend)
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            location: data.location,
            subscribed: false, // TODO: add subscribed (waiting for backend)
          },
          error: null,
        });
      })
      .catch((error: AxiosError) => {
        set({ eventDetails: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
