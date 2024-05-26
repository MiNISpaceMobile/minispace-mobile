import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IFriendRequest from "../interfaces/FriendRequest";

interface FriendRequestsReceivedState {
  friendRequestsReceived: IFriendRequest[];
  error: AxiosError | null;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchFriendRequestsReceived: () => void;
}

export const useFriendRequestsReceivedStore =
  create<FriendRequestsReceivedState>((set, get) => ({
    friendRequestsReceived: [] as IFriendRequest[],
    error: null,
    loading: false,
    page: 0,
    isLastPage: false,
    refresh: () => {
      set({ friendRequestsReceived: [], page: 0, isLastPage: false });
    },
    fetchFriendRequestsReceived: async () => {
      if (get().isLastPage) {
        return;
      }

      set({ loading: true });

      const jwt = await SecureStore.getItemAsync("jwt");

      if (!jwt) {
        set({
          friendRequestsReceived: [],
          error: new AxiosError("couldn't resolve jwt token"),
          page: 0,
          isLastPage: false,
          loading: false,
        });
        return;
      }

      await axios({
        url: "/api/friend-requests/received",
        method: "get",
        baseURL: process.env.EXPO_PUBLIC_API_URL_MOCK,
        params: { Start: get().page, Limit: 10 },
        headers: { Authorization: "Bearer " + jwt },
      })
        .then((response) => {
          set((state) => ({
            friendRequestsReceived: state.friendRequestsReceived.concat(
              response.data.results.$values.map((friendRequest: any) => {
                return {
                  id: friendRequest.guid,
                  timestamp: new Date(friendRequest.timestamp),
                  user: {
                    id: friendRequest.user.guid,
                    firstName: friendRequest.user.firstName,
                    lastName: friendRequest.user.lastName,
                    description: friendRequest.user.description,
                    profilePictureUrl: friendRequest.user.profilePictureUrl,
                  },
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
            friendRequestsReceived: [],
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
