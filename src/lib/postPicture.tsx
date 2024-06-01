import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import FormData from "form-data";

const postPicture = async (
  picture: ImagePicker.ImagePickerAsset,
  mode: "posts" | "events",
  id: string,
) => {
  const mimeType = picture.mimeType;
  const filename = picture.fileName;
  const uri = picture.uri;

  if (!mimeType || !filename || !uri) {
    return;
  }

  const jwt = await SecureStore.getItemAsync("jwt");

  if (!jwt) {
    return;
  }

  const formData = new FormData();
  formData.append("picture", {
    uri,
    type: mimeType,
    name: filename,
  });

  await axios({
    url: `/${mode}/${id}/pictures`,
    method: "post",
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    data: formData,
    params: { index: 0 },
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + jwt,
    },
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {});
};

export default postPicture;
