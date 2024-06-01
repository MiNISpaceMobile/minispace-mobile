import * as ImagePicker from "expo-image-picker";

export default interface IPostCreator {
  eventId: string | null;
  title: string;
  description: string;
  picture: ImagePicker.ImagePickerAsset | null;
}
