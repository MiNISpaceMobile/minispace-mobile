import { create } from "zustand";

import EventFilters from "../interfaces/EventFilters";

interface EventFiltersState {
  filters: EventFilters;
  setFilters: (filters: EventFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: EventFilters = {
  eventTitle: null,
  organizer: null,
  cost: ["free"],
  participants: ["0-50", "50-100", "100+"],
  timeframe: ["current", "future"],
  hasToBeMyEvent: false,
  needAvailableSpace: true,
};

export const useEventFiltersStore = create<EventFiltersState>((set, get) => ({
  filters: defaultFilters,
  setFilters: (newFilters) => {
    set({ filters: newFilters });
  },
  resetFilters: () => {
    set({ filters: defaultFilters });
  },
}));
