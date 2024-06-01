import axios from "axios";
import * as SecureStore from "expo-secure-store";

const reactToComment = async (isDislike: boolean | null, commentId: string) => {
  const jwt = await SecureStore.getItemAsync("jwt");

  if (!jwt) {
    return [];
  }

  await axios({
    url: `/comments/${commentId}/likes`,
    method: "patch",
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { Authorization: "Bearer " + jwt },
    data: { isDislike },
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {});
};

export default reactToComment;
