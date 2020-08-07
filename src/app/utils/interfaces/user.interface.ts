export interface IUser {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  enabled: string;
  lastActivityAt: Date;
  createdAt: Date;
}
