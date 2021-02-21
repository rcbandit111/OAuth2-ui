import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {IUserReset} from '@utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  constructor(private http: HttpClient) { }

  requestReset(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.requestReset, user);
  }

  sendConfirmationToken(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.confirmation_token, user);
  }

  sendResetPasswordToken(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.reset_token, user);
  }

  resetConfirmationPassword(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.reset_confirmation, user);
  }

  resetPassword(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.reset_password, user);
  }

  resetUserPassword(user: IUserReset): Observable<IUserReset> {
    return this.http.post<IUserReset>(environment.api.urls.users.reset_user_password, user);
  }
}
