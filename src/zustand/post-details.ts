import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IPostDetails from "../interfaces/PostDetails";

interface PostDetailsState {
  postDetails: null | IPostDetails;
  error: AxiosError | null;
  loading: boolean;
  fetchPostDetails: (id: string) => void;
  fetchPostReactions: (id: string) => void;
}

export const usePostDetailsStore = create<PostDetailsState>((set, get) => ({
  postDetails: null,
  error: null,
  loading: false,
  fetchPostDetails: async (id: string) => {
    set({ loading: true, postDetails: null });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        postDetails: null,
        error: new AxiosError("couldn't resolve jwt token"),
        loading: false,
      });
      return;
    }

    axios({
      url: `/posts/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        const data = response.data;
        set({
          postDetails: {
            id: data.guid,
            eventId: data.eventGuid,
            title: data.title,
            content: data.content,
            imageURI: data.pictureUrls[0],
            eventTitle: data.eventTitle,
            reactions: {
              Like: data.reactions.Like ?? 0,
              Funny: data.reactions.Funny ?? 0,
              Wow: data.reactions.Wow ?? 0,
              Angry: data.reactions.Angry ?? 0,
              Sad: data.reactions.Sad ?? 0,
            },
            userReaction: data.userReaction,
          },
          error: null,
        });
      })
      .catch((error: AxiosError) => {
        set({ postDetails: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  fetchPostReactions: async (id: string) => {
    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        postDetails: null,
        error: new AxiosError("couldn't resolve jwt token"),
      });
      return;
    }

    axios({
      url: `/posts/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        const data = response.data;
        set({
          postDetails: {
            id: data.guid,
            eventId: data.eventGuid,
            title: data.title,
            content: data.content,
            imageURI: data.pictureUrls[0],
            eventTitle: data.eventTitle,
            reactions: {
              Like: data.reactions.Like ?? 0,
              Funny: data.reactions.Funny ?? 0,
              Wow: data.reactions.Wow ?? 0,
              Angry: data.reactions.Angry ?? 0,
              Sad: data.reactions.Sad ?? 0,
            },
            userReaction: data.userReaction,
          },
          error: null,
        });
      })
      .catch((error: AxiosError) => {
        set({ error, postDetails: null });
      })
      .finally(() => {});
  },
}));
