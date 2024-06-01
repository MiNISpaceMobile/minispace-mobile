import axios from "axios";
import * as SecureStore from "expo-secure-store";

import ICommentReply from "../interfaces/CommentReply";

const getCommentReplies = async (id: string): Promise<ICommentReply[]> => {
  let replies: ICommentReply[] = [];

  const jwt = await SecureStore.getItemAsync("jwt");

  if (!jwt) {
    return [];
  }

  await axios({
    url: `/comments/${id}/responses`,
    method: "get",
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { Authorization: "Bearer " + jwt },
    params: {
      Start: 0,
      Limit: 10000,
    },
  })
    .then((response) => {
      replies = response.data.results.$values.map((comment: any) => {
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
          likes: comment.likeCount,
          dislikes: comment.dislikeCount,
          userReactionIsDislike: comment.userReactionIsDislike,
        };
      });
    })
    .catch(() => {})
    .finally(() => {});

  return replies;
};

export default getCommentReplies;
