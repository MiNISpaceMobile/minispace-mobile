import ISimpleUser from "./SimpleUser";

export default interface IFriendRequest {
  id: string;
  timestamp: Date;
  user: ISimpleUser;
}
