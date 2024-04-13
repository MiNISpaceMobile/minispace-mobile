import axios from "axios";
import { create } from "zustand";

import Post from "../interfaces/Post";

interface PostsState {
  posts: Post[];
  error: null | string;
  loading: boolean;
  page: number;
  isLastPage: boolean;
  refresh: () => void;
  fetchPosts: () => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [] as Post[],
  error: null,
  loading: false,
  page: 0,
  isLastPage: false,
  refresh: () => {
    set({ posts: [], page: 0, isLastPage: false });
  },
  fetchPosts: async () => {
    if (get().isLastPage) {
      return;
    }

    set({ loading: true });

    axios({
      url: "/posts",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      params: { page: get().page },
    })
      .then((response) => {
        set((state) => ({
          posts: state.posts.concat(response.data.posts),
          error: null,
          page: state.page + 1,
          isLastPage: response.data.isLastPage,
        }));
      })
      .catch((error) => {
        set({ posts: [], error, page: 0, isLastPage: false });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
