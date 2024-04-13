import axios from "axios";
import { create } from "zustand";

import PostDetails from "../interfaces/PostDetails";

interface PostDetailsState {
  postDetails: null | PostDetails;
  error: null | string;
  loading: boolean;
  fetchPostDetails: (id: string) => void;
}

export const usePostDetailsStore = create<PostDetailsState>((set, get) => ({
  postDetails: null,
  error: null,
  loading: false,
  fetchPostDetails: async (id: string) => {
    set({ loading: true });

    axios({
      url: `/posts/${id}`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    })
      .then((response) => {
        set({ postDetails: response.data.postDetails, error: null });
      })
      .catch((error) => {
        set({ postDetails: null, error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
