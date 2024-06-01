import ICommentReply from "./CommentReply";
import ISimpleUser from "./SimpleUser";

export default interface IComment {
  id: string;
  owner: ISimpleUser;
  content: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  responsesCount: number;
  replies: ICommentReply[];
  userReactionIsDislike: boolean | null;
}
