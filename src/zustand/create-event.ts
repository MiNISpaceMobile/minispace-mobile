import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { create } from "zustand";

import IEventCreator from "../interfaces/EventCreator";

interface CreateEventState {
  eventCreator: IEventCreator;
  loading: boolean;
  error: AxiosError | null;
  updateEventCreator: (eventCreator: IEventCreator) => void;
  createEvent: () => Promise<void>;
  hasErrors: () => boolean;
  clear: () => void;
}

const defaultEventCreator: IEventCreator = {
  title: "",
  description: "",
  publicationDate: moment().toDate(),
  startDate: moment().toDate(),
  endDate: moment().add(1, "days").toDate(),
  location: "",
  capacity: 0,
  fee: 0,
  picture: null,
};

export const useCreateEventStore = create<CreateEventState>((set, get) => ({
  eventCreator: defaultEventCreator,
  loading: false,
  error: null,
  updateEventCreator: (eventCreator: IEventCreator) => {
    set({ eventCreator });
  },
  createEvent: async () => {
    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        error: new AxiosError("jwt token not in secure store"),
        loading: false,
      });
    }

    await axios({
      url: `/events`,
      method: "post",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      data: {
        ...get().eventCreator,
        eventCategory: 0, // event category is not used, but need to be passed (will be removed in the future)
        publicationDate: get().eventCreator.startDate, // currenlty publicationDate is always equal startDate
      },
    })
      .then((response) => {
        set({ error: null, eventCreator: defaultEventCreator });
      })
      .catch((error: AxiosError) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  hasErrors: () => {
    const eventCreator = get().eventCreator;
    return (
      eventCreator.title.length === 0 ||
      eventCreator.location.length === 0 ||
      eventCreator.capacity === 0
    );
  },
  clear: () => {
    set({ eventCreator: defaultEventCreator });
  },
}));
