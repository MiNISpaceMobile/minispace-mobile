import axios from "axios";
import { create } from "zustand";

import IPostComment from "../interfaces/PostComment";

interface PostCommentsState {
  comments: IPostComment[];
  error: null | string;
  loading: boolean;
  fetchComments: (id: string) => void;
}

export const usePostCommentsStore = create<PostCommentsState>((set, get) => ({
  comments: [] as IPostComment[],
  error: null,
  loading: false,
  fetchComments: async (id: string) => {
    set({ loading: true, comments: [] });

    axios({
      url: `/comments/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    })
      .then((response) => {
        set({ comments: response.data.postComments, error: null });
      })
      .catch((error) => {
        set({ comments: [], error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
