import {IUser} from '@utils/interfaces';

export class User implements IUser {
  createdAt = null;
  email = null;
  enabled = null;
  firstName = null;
  id = null;
  lastActivityAt = null;
  lastName = null;
  login = null;
  role = null;

  constructor(c?: IUser) {
    if (c) {
      this.createdAt = c.createdAt ? c.createdAt : null;
      this.email = c.email ? c.email : null;
      this.enabled = c.enabled ? c.enabled : null;
      this.firstName = c.firstName ? c.firstName : null;
      this.id = c.id ? c.id : null;
      this.lastActivityAt = c.lastActivityAt ? c.lastActivityAt : null;
      this.lastName = c.lastName ? c.lastName : null;
      this.login = c.login ? c.login : null;
      this.role = c.role ? c.role : null;
    }
  }
}
