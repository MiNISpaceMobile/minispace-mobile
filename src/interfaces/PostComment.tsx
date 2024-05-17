import User from "./User";

export default interface IPostComment {
  id: string;
  owner: User;
  content: string;
  createdAt: number;
  likes: number;
  replies: IPostComment[];
}
