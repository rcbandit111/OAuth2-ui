import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '@core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.isAuthorized(route.data.requiredRole);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.isAuthorized(childRoute.data.requiredRole);
  }
}
