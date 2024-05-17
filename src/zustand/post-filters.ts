import { create } from "zustand";

import IPostFilters from "../interfaces/PostFilters";

interface PostFiltersState {
  filters: IPostFilters;
  setFilters: (filters: IPostFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: IPostFilters = {
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
