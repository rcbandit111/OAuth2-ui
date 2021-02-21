import {IUserFilter, IUserSearchEvent} from '@utils/interfaces';
import {UserFilter} from '@utils/models/user-filter.model';

export class UserSearchEvent implements IUserSearchEvent {
  filter = new UserFilter();
  page = null;
  size = null;

  constructor(c?: IUserSearchEvent) {
    if (c) {
      this.page = c.page ? c.page : null;
      this.size = c.size ? c.size : null;

      if (c.filter) {
        this.filter = new UserFilter(c.filter);
      }
    }
  }
}
