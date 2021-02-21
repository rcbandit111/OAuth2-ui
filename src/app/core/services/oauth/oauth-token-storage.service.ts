import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageService, SessionStorageService, WebStorageService} from 'ngx-webstorage';

export const ACCESS = 'tp.access_token';
export const REFRESH = 'tp.refresh_token';

@Injectable({
  providedIn: 'root'
})
export class OauthTokenStorageService {
  private jwtHelper: JwtHelperService;

  private activeStorage: WebStorageService;

  constructor(
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService) {

    this.jwtHelper = new JwtHelperService();
  }

  save(access: string, refresh: string) {
    this.update(access, refresh);
  }

  update(access: string, refresh: string) {
    this.getActiveStorage().store(ACCESS, access);
    this.getActiveStorage().store(REFRESH, refresh);
  }

  clear() {
    this.getActiveStorage().clear(ACCESS);
    this.getActiveStorage().clear(REFRESH);
  }

  hasActiveToken(): boolean {
    return this.getActiveAccessToken() != null || this.getActiveRefreshToken() != null
  }

  getActiveAccessToken(): string {
    return this.getActiveToken(ACCESS);
  }

  getActiveRefreshToken(): string {
    return this.getActiveToken(REFRESH);
  }

  canRefresh(): boolean {
    return !this.isTokenValid(this.getActiveStorage().retrieve(ACCESS))
      && this.isTokenValid(this.getActiveStorage().retrieve(REFRESH));
  }

  isTokenValid(jwtToken: string): boolean {
    return jwtToken != null && !this.jwtHelper.isTokenExpired(jwtToken);
  }

  private getActiveStorage(): WebStorageService {
    if (!this.activeStorage) {
      this.activeStorage = this.sessionStorage;
    }

    return this.activeStorage;
  }

  private getActiveToken(tokenKey: string): string {
    const access = this.getActiveStorage().retrieve(tokenKey);

    if (!this.isTokenValid(access)) {
      return null;
    }

    return access;
  }
}
