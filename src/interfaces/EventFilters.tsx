export type CostType = "Free" | "Paid";
export type ParticipantsType = "To50" | "From50To100" | "Above100";
export type TimeFrameType = "Past" | "Current" | "Future";

export default interface IEventFilters {
  eventTitle: string | null;
  organizer: string | null;
  cost: CostType[];
  participants: ParticipantsType[];
  timeframe: TimeFrameType[];
  hasToBeMyEvent: boolean /* only for Organizer */;
  needAvailableSpace: boolean;
}
