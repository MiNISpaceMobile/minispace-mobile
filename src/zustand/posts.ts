import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IPost from "../interfaces/Post";
import IPostFilters from "../interfaces/PostFilters";

interface PostsState {
  posts: IPost[];
  error: AxiosError | null;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchPosts: (filters: IPostFilters) => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [] as IPost[],
  error: null,
  loading: false,
  page: 0,
  isLastPage: false,
  refresh: () => {
    set({ posts: [], page: 0, isLastPage: false });
  },
  fetchPosts: async (filters: IPostFilters) => {
    if (get().isLastPage) {
      return;
    }

    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        posts: [],
        error: new AxiosError("couldn't resolve jwt token"),
        page: 0,
        isLastPage: false,
        loading: false,
      });
      return;
    }

    const listEventPosts = filters.eventId !== null;

    axios({
      url: listEventPosts ? `/events/${filters.eventId}/posts` : "/posts/user",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      params: {
        Start: get().page,
        Limit: 10,
        showFriendsPosts: filters.friendRegisteredForEvent,
      },
    })
      .then((response) => {
        set((state) => ({
          posts: state.posts.concat(
            response.data.results.$values.map((post: any) => {
              return {
                id: post.guid,
                title: post.title,
                content: post.content,
                imageURI: post.pictureUrls[0],
              };
            }),
          ),
          error: null,
          page: state.page + 1,
          isLastPage: response.data.paging.last,
        }));
      })
      .catch((error: AxiosError) => {
        set({ posts: [], error, page: 0, isLastPage: false });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
