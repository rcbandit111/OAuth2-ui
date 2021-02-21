import { Injectable } from '@angular/core';
import {environment} from '@env/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {UserAuthentication} from '@utils/models';
import {ITokenPayload, ITokenResponse, IUserAuthentication} from '@utils/interfaces';
import {OauthTokenStorageService} from './oauth-token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OauthProviderService {

  OAUTH_CLIENT_TOKEN = btoa(`${environment.api.keys.auth.clientId}:${environment.api.keys.auth.secret}`);

  private _jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
              private tokenStorage: OauthTokenStorageService) {

    // We do not inject it since we do not use full JWT support only decoding
    this._jwtHelper = new JwtHelperService();
  }

  login(username: string, password: string): Observable<IUserAuthentication> {
    return this.fetchToken(username, password)
      .pipe(
        tap(token => {
          this.tokenStorage.save(token.access_token, token.refresh_token);
        }),
        map(token => {
          return this.extractUserFromToken(token.access_token);
        })
      );
  }

  active(): IUserAuthentication {
    if (!this.tokenStorage.hasActiveToken()) {
      return null;
    }

    const activeToken = this.tokenStorage.getActiveAccessToken() != null ?
      this.tokenStorage.getActiveAccessToken() : this.tokenStorage.getActiveRefreshToken();

    return this.extractUserFromToken(activeToken);
  }

  getAuthHeader(): Observable<string> {
    if (!this.tokenStorage.hasActiveToken()) {
      return of(null);
    }

    return this.getActiveAccessToken()
      .pipe(
        map(token => 'Bearer ' + token)
      );
  }

  logout() {
    this.tokenStorage.clear();
  }

  private getActiveAccessToken(): Observable<string> {
    if (this.tokenStorage.canRefresh()) {
      const refreshToken = this.tokenStorage.getActiveRefreshToken();

      return this.refreshToken(refreshToken)
        .pipe(
          tap(token => {
            this.tokenStorage.update(token.access_token, token.refresh_token);
          }),
          map(token => token.access_token)
        );
    }

    return of(this.tokenStorage.getActiveAccessToken());
  }

  private refreshToken(token: string): Observable<ITokenResponse> {
    const body = this.buildOauthTokenRefreshParams(token);
    const httpOptions = this.buildOauthTokenRequestHeaders();

    return this.http.post<ITokenResponse>(environment.api.urls.auth.token, body.toString(), httpOptions);
  }

  private fetchToken(username: string, password: string): Observable<ITokenResponse> {
    const body = this.buildOauthTokenRequestParams(username, password);
    const httpOptions = this.buildOauthTokenRequestHeaders();

    return this.http.post<ITokenResponse>(environment.api.urls.auth.token, body.toString(), httpOptions);
  }

  private extractUserFromToken(jwtToken: string): IUserAuthentication {
    const payload = <ITokenPayload> this._jwtHelper.decodeToken(jwtToken);

    return new UserAuthentication(payload);
  }

  private buildOauthTokenRefreshParams(token: string): URLSearchParams {
    const params = new URLSearchParams();

    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', token);

    return params;
  }

  private buildOauthTokenRequestParams(username: string, password: string): URLSearchParams {
    const params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);

    return params;
  }

  private buildOauthTokenRequestHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + this.OAUTH_CLIENT_TOKEN
      })
    };
  }
}
