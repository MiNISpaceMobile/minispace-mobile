import ISimpleUser from "./SimpleUser";

export default interface ICommentReply {
  replies: any;
  id: string;
  owner: ISimpleUser;
  content: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  userReactionIsDislike: boolean | null;
}
