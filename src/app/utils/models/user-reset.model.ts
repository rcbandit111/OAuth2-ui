import {IUserReset} from '@utils/interfaces';

export class UserReset implements IUserReset {

  id: string = null;
  name: string = null;
  email: string = null;
  password: string = null;
  oldPassword: string = null;
  confirmPassword: string = null;
  confirmationToken: string = null;
  resetPasswordToken: string = null;

  constructor(c?: IUserReset) {
    if (c) {
      this.id = c.id;
      this.name = c.name;
      this.email = c.email;
      this.password = c.password;
      this.oldPassword = c.oldPassword;
      this.confirmPassword = c.confirmPassword;
      this.confirmationToken = c.confirmationToken;
      this.resetPasswordToken = c.resetPasswordToken;
    }
  }
}
