import ISimpleUser from "./SimpleUser";

export default interface IEventDetails {
  id: string;
  description: string;
  imageURI: string;
  eventTitle: string;
  participants: number;
  friends: ISimpleUser[];
  startDate: Date;
  endDate: Date;
  location: string;
  subscribed: boolean;
}
