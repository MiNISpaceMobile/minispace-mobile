import * as ImagePicker from "expo-image-picker";

export default interface IEventCreator {
  title: string;
  description: string;
  publicationDate: Date;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  fee: number;
  picture: ImagePicker.ImagePickerResult | null;
}
