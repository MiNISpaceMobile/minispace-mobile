import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import ISimpleUser from "../interfaces/SimpleUser";

interface FriendsState {
  friends: ISimpleUser[];
  error: AxiosError | null;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchFriends: () => void;
}

export const useFriendsStore = create<FriendsState>((set, get) => ({
  friends: [] as ISimpleUser[],
  error: null,
  loading: false,
  page: 0,
  isLastPage: false,
  refresh: () => {
    set({ friends: [], page: 0, isLastPage: false });
  },
  fetchFriends: async () => {
    if (get().isLastPage) {
      return;
    }

    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        friends: [],
        error: new AxiosError("couldn't resolve jwt token"),
        page: 0,
        isLastPage: false,
        loading: false,
      });
      return;
    }

    await axios({
      url: "/users/user/friends",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      params: { Start: get().page, Limit: 10 },
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        set((state) => ({
          friends: state.friends.concat(
            response.data.results.$values.map((friendRequest: any) => {
              return {
                id: friendRequest.guid,
                firstName: friendRequest.firstName,
                lastName: friendRequest.lastName,
                description: friendRequest.description,
                profilePictureUrl: friendRequest.profilePictureUrl,
              };
            }),
          ),
          error: null,
          page: state.page + 1,
          isLastPage: response.data.paging.last,
        }));
      })
      .catch((error: AxiosError) => {
        set({
          friends: [],
          error,
          page: 0,
          isLastPage: false,
        });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
