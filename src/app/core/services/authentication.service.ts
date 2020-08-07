import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
import {IUserAuthentication} from '@utils/interfaces';
import {AuthenticationProviderService} from './authentication-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _cachedCurrentUser: IUserAuthentication;
  private _authEvents = new Subject<boolean>();

  constructor(private authProvider: AuthenticationProviderService) {}

  login(username: string, password: string): Observable<boolean>  {
    return this.authProvider.login(username, password)
      .pipe(
        tap((authentication) => {
          this._cachedCurrentUser = authentication;
        }),
        map((authentication) => {
          return authentication != null;
        }),
        tap((authenticationStatus) => {
          this._authEvents.next(true);
        })
      );
  }

  isAuthorized(requiredRoles?: string | string[]): boolean {
      if (Array.isArray(requiredRoles)) {
        return requiredRoles.some(role => this.checkRole(role));
      }
      return this.checkRole(requiredRoles);
  }

  private checkRole(requiredRole?: string): boolean {
    const activeUser = this._cachedCurrentUser || this.authProvider.active();
    return activeUser && (!requiredRole || activeUser.hasRole(requiredRole));
  }

  authStatus(): Observable<boolean> {
    return this._authEvents.asObservable();
  }

  getAPIAuthHeaders(): Observable<HttpHeaders> {
    return this.authProvider.getAuthHeader()
      .pipe(
        map(authHeader => new HttpHeaders({ 'Authorization': authHeader }))
      );
  }

  logout() {
    this._cachedCurrentUser = null;
    this.authProvider.logout();

    this._authEvents.next(false);
  }

  public authMessage: string = "";
}
