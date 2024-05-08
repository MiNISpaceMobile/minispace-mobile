import User from "./User";

export default interface PostComment {
  id: string;
  owner: User;
  content: string;
  createdAt: number;
  likes: number;
  replies: PostComment[];
}
