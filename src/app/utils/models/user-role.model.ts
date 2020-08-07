import {IUserRole} from '@utils/interfaces';

export class UserRole implements IUserRole {
  constructor(public code: string) { }
}
