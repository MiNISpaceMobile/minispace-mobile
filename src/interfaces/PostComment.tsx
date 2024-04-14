export default interface PostComment {
  id: string;
  username: string;
  userProfilePicture: string;
  content: string;
  createdAt: number;
  likes: number;
  replies: PostComment[];
}
