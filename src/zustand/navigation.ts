import { create } from "zustand";

type DisplayStyle = "flex" | "none";

interface NavigationState {
  display: DisplayStyle;
  setDisplay: (newDisplay: DisplayStyle) => void;
}

/* This store is only to hide/show bottom navigation. When in specific tab
 * eg. `PostDetailsStack` we don't want to have bottom navigation.
 * We hide it by using store, because navigation.setOptions() don't work with
 * `BottomNavigation.Bar` from `react-native-paper`.
 */
export const useNavigationStore = create<NavigationState>((set) => ({
  display: "flex",
  setDisplay: (newDisplay: DisplayStyle) => {
    set({ display: newDisplay });
  },
}));
