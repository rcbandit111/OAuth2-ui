export interface IUserReset {
  id: string;
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  confirmPassword: string;
  confirmationToken: string;
  resetPasswordToken: string;
}
