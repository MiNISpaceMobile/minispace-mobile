export type CostType = "free" | "paid";
export type ParticipantsType = "0-50" | "50-100" | "100+";
export type TimeFrameType = "past" | "current" | "future";

export default interface EventFilters {
  eventTitle: string | null;
  organizer: string | null;
  cost: CostType[];
  participants: ParticipantsType[];
  hasToBeRegisteredForEvent: boolean;
  hasToHaveFriendRegisteredForEvent: boolean;
  timeframe: TimeFrameType[];
  hasToBeMyEvent: boolean /* only for Organizer */;
}
