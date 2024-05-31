import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import IComment from "../interfaces/Comment";
import ICommentReply from "../interfaces/CommentReply";
import getCommentReplies from "../lib/getCommentReplies";

interface PostCommentsState {
  comments: IComment[];
  error: AxiosError | null;
  loading: boolean;
  fetchComments: (id: string) => void;
  setError: (error: AxiosError | null) => void;
}

export const usePostCommentsStore = create<PostCommentsState>((set, get) => ({
  comments: [] as IComment[],
  error: null,
  loading: false,
  fetchComments: async (id: string) => {
    set({ loading: true });

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      set({
        comments: [],
        error: new AxiosError("couldn't resolve jwt token"),
        loading: false,
      });
      return;
    }

    axios({
      url: `/posts/${id}/comments`,
      method: "get",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
      params: {
        Start: 0,
        Limit: 10000,
      },
    })
      .then(async (response) => {
        let comments = response.data.results.$values.map((comment: any) => {
          return {
            id: comment.guid,
            owner: {
              id: comment.author.guid,
              firstName: comment.author.firstName,
              lastName: comment.author.lastName,
              description: comment.author.description,
              profilePicture: comment.author.profilePictureUrl,
            },
            content: comment.content,
            createdAt: new Date(comment.creationDate),
            likes: 0, // TODO: fetch likes
            responsesCount: comment.responsesCount,
            replies: [] as ICommentReply[],
            // replies: await getCommentReplies(comment.guid),
          };
        }) as IComment[];

        comments = await Promise.all(
          comments.map(async (comment) => {
            comment.replies = await getCommentReplies(comment.id);
            return comment;
          }),
        );

        set({
          comments,
          error: null,
        });
      })
      .catch((error: AxiosError) => {
        set({ comments: [], error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  setError: (error: AxiosError | null) => {
    set({ comments: [], error, loading: false });
  },
}));
