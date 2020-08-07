import {IUser} from '@utils/interfaces';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '@app/panel/service/user.service';
import {IPagedResult} from '@app/panel/common/paged-result';

@Injectable()
export class UserListResolver implements Resolve<IPagedResult<IUser>> {
  constructor(private _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IPagedResult<IUser>> {
    return this._userService.search();
  }
}
