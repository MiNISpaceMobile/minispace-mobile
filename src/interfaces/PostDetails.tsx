import IUser from "./User";

export default interface IPostDetails {
  id: string;
  eventId: string;
  title: string;
  content: string;
  imageURI: string;
  eventTitle: string;
}
