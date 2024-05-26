import axios, { AxiosError } from "axios";
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

    axios({
      url: "/posts",
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL_MOCK,
      // TODO: pass filters to params
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
      .catch((error: AxiosError) => {
        set({ posts: [], error, page: 0, isLastPage: false });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
