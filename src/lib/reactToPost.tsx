import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { Reaction } from "../interfaces/PostDetails";

const reactToPost = async (userReaction: Reaction | null, postId: string) => {
  const jwt = await SecureStore.getItemAsync("jwt");

  if (!jwt) {
    return [];
  }

  await axios({
    url: `/posts/${postId}/reactions`,
    method: "patch",
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { Authorization: "Bearer " + jwt },
    data: { type: userReaction },
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {});
};

export default reactToPost;
