import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {IPagedResult} from '../common/paged-result';
import {HttpUtils} from '../common/http-utils';
import {DateUtil} from '../common/date-util';
import {IPagination, IUser, IUserFilter} from '@utils/interfaces';
import {Pagination} from '@utils/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  search(pagination?: IPagination, filter?: IUserFilter): Observable<IPagedResult<IUser>> {
    const params = this.buildFilterParams(filter);
    if (!pagination) {
      pagination = new Pagination();
    }
    const pagedFilter = HttpUtils.appendPageParams(params, pagination.current, pagination.size);

    return this.http.get<IPagedResult<IUser>>(environment.api.urls.users.find, {params: pagedFilter});
  }

  private buildFilterParams(filter?: IUserFilter): HttpParams {
    let params = new HttpParams();

    if (filter) {
      if (filter.name) {
        params = params.append('name', filter.name);
      }

      if (filter.login) {
        params = params.append('login', filter.login);
      }

      if (filter.email) {
        params = params.append('email', filter.email);
      }
    }

    return params;
  }

  save(user: IUser) {
    return this.http.post(environment.api.urls.users.create, user);
  }

  persist(user: IUser) {
    return this.http.post(environment.api.urls.users.persist(user.id), user);
  }

  get(userId: number): Observable<IUser> {
    return this.http.get<IUser>(environment.api.urls.users.get(userId));
  }

  export() {
    return this.http.get(environment.api.urls.users.export,  { responseType: 'blob' });
  }
}
