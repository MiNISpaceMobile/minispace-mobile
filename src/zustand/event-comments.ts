import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IComment from "../interfaces/Comment";

interface EventCommentsState {
  comments: IComment[];
  error: AxiosError | null;
  loading: boolean;
  fetchComments: (id: string) => void;
}

export const useEventCommentsStore = create<EventCommentsState>((set, get) => ({
  comments: [] as IComment[],
  error: null,
  loading: false,
  fetchComments: async (id: string) => {
    set({ loading: true, comments: [] });

    axios({
      url: `/comments/by-event/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    })
      .then((response) => {
        set({ comments: response.data.comments, error: null });
      })
      .catch((error: AxiosError) => {
        set({ comments: [], error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
