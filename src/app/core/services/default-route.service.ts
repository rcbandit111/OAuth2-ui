import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteService {

  constructor(private auth: AuthenticationService,
              private router: Router) {}

  redirectToDefault() {
    const defaultRouteForRole = environment.defaultRoutes.find(route => this.auth.isAuthorized(route.role));

    if (!defaultRouteForRole) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate([defaultRouteForRole.route]);
  }
}
