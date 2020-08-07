import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IUserAuthentication} from '@utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthenticationProviderService {

  abstract login(username: string, password: string): Observable<IUserAuthentication>;

  abstract active(): IUserAuthentication;

  abstract getAuthHeader(): Observable<string>;

  abstract logout();
}
