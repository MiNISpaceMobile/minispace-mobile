import { create } from "zustand";

import PostFilters from "../interfaces/PostFilters";

interface PostFiltersState {
  filters: PostFilters;
  setFilters: (filters: PostFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: PostFilters = {
  eventTitle: null,
  organizer: null,
  cost: ["free", "paid"],
  participants: ["0-50", "50-100", "100+"],
  hasToBeRegisteredForEvent: true,
  hasToHaveFriendRegisteredForEvent: true,
  timeframe: ["current", "future"],
  hasToBeMyEvent: false,
};

export const usePostFiltersStore = create<PostFiltersState>((set, get) => ({
  filters: defaultFilters,
  setFilters: (newFilters) => {
    set({ filters: newFilters });
  },
  resetFilters: () => {
    set({ filters: defaultFilters });
  },
}));
