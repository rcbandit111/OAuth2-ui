import {IUser} from '@utils/interfaces';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '@app/panel/service/user.service';

@Injectable()
export class UserResolver implements Resolve<IUser> {
  constructor(private _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IUser> {
    return this._userService.get(route.params.id);
  }
}
