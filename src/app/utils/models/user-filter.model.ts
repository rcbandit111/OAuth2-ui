import {IUserFilter} from '@utils/interfaces';

export class UserFilter implements IUserFilter {
  name = null;
  login = null;
  email = null;
  role = null;

  constructor(c?: IUserFilter) {
    if (c) {
      this.name = c.name ? c.name : null;
      this.login = c.login ? c.login : null;
      this.email = c.email ? c.email : null;
      this.role = c.role ? c.role : null;
    }
  }
}
