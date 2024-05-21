export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  dateOfBirth: Date;
  isAdmin: boolean;
  isOrganizer: boolean;
  emailNotifications: boolean;
  profilePicture: string | null;
}
