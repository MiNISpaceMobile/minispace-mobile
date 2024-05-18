import IUser from "./User";

export default interface IPostComment {
  id: string;
  owner: IUser;
  content: string;
  createdAt: number;
  likes: number;
  replies: IPostComment[];
}
