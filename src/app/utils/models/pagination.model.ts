import {IPagination} from '@utils/interfaces/pagination.interface';
import {environment} from '@env/environment';

export class Pagination implements IPagination {
  current = 1;
  total = 1;
  size = environment.config.pageSize;

  constructor(c?: IPagination) {
    if (c) {
      if (c.current) {
        this.current = c.current;
      }
      if (c.total) {
        this.total = c.total;
      }
      if (c.size) {
        this.size = c.size;
      }
    }
  }
}
