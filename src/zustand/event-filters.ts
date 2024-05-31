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
  cost: ["Free"],
  participants: ["To50", "From50To100", "Above100"],
  timeframe: ["Current", "Future"],
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
