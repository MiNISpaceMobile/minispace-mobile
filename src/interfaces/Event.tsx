export default interface IEvent {
  id: string;
  title: string;
  imageURI: string;
  startDate: Date;
  endDate: Date;
  friendParticipants: number;
  rating: number | null;
  availableSpace: boolean;
  lowAvailableSpace: boolean;
  active: boolean;
  firstInactive: boolean;
}
