import axios from "axios";
import { create } from "zustand";

import PostComment from "../interfaces/PostComment";

interface CommentsState {
  comments: PostComment[];
  error: null | string;
  loading: boolean;
  fetchComments: (id: string) => void;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: [] as PostComment[],
  error: null,
  loading: false,
  fetchComments: async (id: string) => {
    set({ loading: true });

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
