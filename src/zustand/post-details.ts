import axios, { AxiosError } from "axios";
import { create } from "zustand";

import IPostDetails from "../interfaces/PostDetails";

interface PostDetailsState {
  postDetails: null | IPostDetails;
  error: AxiosError | null;
  loading: boolean;
  fetchPostDetails: (id: string) => void;
}

export const usePostDetailsStore = create<PostDetailsState>((set, get) => ({
  postDetails: null,
  error: null,
  loading: false,
  fetchPostDetails: async (id: string) => {
    set({ loading: true, postDetails: null });

    axios({
      url: `/posts/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    })
      .then((response) => {
        set({ postDetails: response.data.postDetails, error: null });
      })
      .catch((error: AxiosError) => {
        set({ postDetails: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
