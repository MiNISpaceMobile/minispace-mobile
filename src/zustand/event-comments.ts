import { AxiosError } from "axios";
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
    set({ error: new AxiosError("unimplemented endpoint"), comments: [] });
  },
}));
