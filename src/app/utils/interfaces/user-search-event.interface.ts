import {IUserFilter} from '@utils/interfaces/user-filter.interface';

export interface IUserSearchEvent {
  filter: IUserFilter;
  page: number;
  size: number;
}
