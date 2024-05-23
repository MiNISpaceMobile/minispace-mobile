import ISimpleUser from "./SimpleUser";

export default interface FriendRequest {
  id: string;
  timestamp: Date;
  target: ISimpleUser;
  source: ISimpleUser;
}
