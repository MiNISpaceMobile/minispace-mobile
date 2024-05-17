import User from "./User";

export default interface PostDetails {
  id: string;
  title: string;
  content: string;
  imageURI: string;
  eventTitle: string;
  participants: number;
  friends: User[];
  subscribed: boolean;
}
