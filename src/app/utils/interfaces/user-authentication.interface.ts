import {IUserRole} from './user-role.interface';

export interface IUserAuthentication {
  username: string;
  roles: IUserRole[];
  hasRole: (requested: string) => boolean;
}
