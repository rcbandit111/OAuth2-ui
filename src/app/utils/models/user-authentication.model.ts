import {UserRole} from './user-role.model';
import {ITokenPayload, IUserAuthentication, IUserRole} from '@utils/interfaces';

export class UserAuthentication implements IUserAuthentication {

  username: string = null;
  roles: IUserRole[] = [];

  constructor(c?: ITokenPayload) {
    if (c) {
      this.username = c.user_name ? c.user_name : null;

      this.roles = c.authorities ? c.authorities.map(i => new UserRole(i)) : [];
    }
  }

  hasRole(requested: string): boolean {
    return this.roles.find(role => role.code === requested) != null;
  }
}
