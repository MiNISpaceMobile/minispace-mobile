import axios from "axios";
import * as SecureStore from "expo-secure-store";

const createComment = async (
  content: string,
  postId: string,
  commentId?: string,
) => {
  const jwt = await SecureStore.getItemAsync("jwt");

  if (!jwt) {
    return [];
  }

  await axios({
    url: "/comments",
    method: "post",
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { Authorization: "Bearer " + jwt },
    data: {
      postGuid: postId,
      content,
      inResponseTo: commentId,
    },
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {});
};

export default createComment;
