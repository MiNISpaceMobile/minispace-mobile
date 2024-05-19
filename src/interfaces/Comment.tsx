import IUser from "./User";

export default interface IComment {
  id: string;
  owner: IUser;
  content: string;
  createdAt: number;
  likes: number;
  replies: IComment[];
}
