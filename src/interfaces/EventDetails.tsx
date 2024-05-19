import IUser from "./User";

export default interface IEventDetails {
  id: string;
  description: string;
  imageURI: string;
  eventTitle: string;
  participants: number;
  friends: IUser[];
  startDate: Date;
  endDate: Date;
  location: string;
  subscribed: boolean;
}
