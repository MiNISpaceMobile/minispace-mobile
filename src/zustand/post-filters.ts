import { create } from "zustand";

import PostFilters from "../interfaces/PostFilters";

interface PostFiltersState {
  filters: PostFilters;
  setFilters: (filters: PostFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: PostFilters = {
  friendRegisteredForEvent: true,
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
