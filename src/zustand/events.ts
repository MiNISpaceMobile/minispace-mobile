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
      params: {
        Start: get().page,
        Limit: 10,
        EventName: filters.eventTitle,
        OrganizerName: filters.organizer,
        Participants: filters.participants,
        Price: filters.cost,
        Time: filters.timeframe,
        OnlyAvailablePlace: filters.needAvailableSpace,
      },
    })
      .then((response) => {
        // first event with !active has firstInactive,
        // usefull because this event has divider in event list
        let firstInactiveAppeared = false;
        set((state) => ({
          events: state.events.concat(
            response.data.results.$values.map((eventItem: any) => {
              const transformedEventItem: IEvent = {
                id: eventItem.guid,
                title: eventItem.title,
                imageURI: eventItem.pictureUrls.$values[0],
                startDate: new Date(eventItem.startDate),
                endDate: new Date(eventItem.endDate),
                participants: eventItem.participantCount,
                rating: eventItem.rating,
                availableSpace: eventItem.availablePlaces > 0,
                lowAvailableSpace:
                  eventItem.availablePlaces > 0 &&
                  eventItem.availablePlaces < 10,
                active: new Date(eventItem.endDate) > new Date(),
                firstInactive: false,
              };
              if (!firstInactiveAppeared && !transformedEventItem.active) {
                firstInactiveAppeared = true;
                return { ...transformedEventItem, firstInactive: true };
              }
              return { ...transformedEventItem, firstInactive: false };
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
}));
