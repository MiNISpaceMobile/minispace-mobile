import axios from "axios";
import { create } from "zustand";

import IComment from "../interfaces/Comment";

interface PostCommentsState {
  comments: IComment[];
  error: null | string;
  loading: boolean;
  fetchComments: (id: string) => void;
}

export const usePostCommentsStore = create<PostCommentsState>((set, get) => ({
  comments: [] as IComment[],
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
