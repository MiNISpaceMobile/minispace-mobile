export type Reaction = "Like" | "Funny" | "Wow" | "Angry" | "Sad";

export default interface IPostDetails {
  id: string;
  eventId: string;
  title: string;
  content: string;
  imageURI: string;
  eventTitle: string;
  reactions: Record<Reaction, number>;
  userReaction: Reaction | null;
}
