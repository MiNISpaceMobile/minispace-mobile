export default interface IEvent {
  id: string;
  title: string;
  imageURI: string;
  startDate: Date;
  endDate: Date;
  friendParticipants: number;
  rating: number | null;
  lowAvailableSpace: boolean;
  active: boolean;
}
