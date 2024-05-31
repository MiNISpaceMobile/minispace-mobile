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
            friends: data.friends.$values.map((friend: any) => {
              return {
                id: friend.guid,
                firstName: friend.firstName,
                lastName: friend.lastName,
                description: friend.description,
                profilePicture: friend.profilePicture,
              };
            }),
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            location: data.location,
            subscribed: data.isParticipant,
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
