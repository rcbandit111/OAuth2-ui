import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '@core/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthorized()) {
      return true;
    }

    const extras = { queryParams: {} };

    if (state.url !== '/') {
      extras.queryParams['redirectUrl'] = state.url.split('?')[0];

      next.queryParamMap.keys
        .forEach(key => extras.queryParams[key] = next.queryParamMap['params'][key]);
    }

    this.router.navigate(['auth'], extras);

    return false;
  }
}
