import {map, switchMap} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {AuthenticationService} from '@core/services/authentication.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const unauthorizedRequest = environment.api.unauthorizedUrls.find((pattern) => pattern.test(req.url));

    if (unauthorizedRequest) {
      // There is no need for additional auth and tokens for this request

      return next.handle(req);
    }

    if (!this.authService.isAuthorized()) {
      // User is not authorized, we cant really do anything. Such requests should not be issued at all.
      console.log('Unauthorized user tried to access API requiring authorization ' + req.url);
      return next.handle(req);
    }

    return this.authService.getAPIAuthHeaders()
      .pipe(
        map(authHeaders => {
          const authorizedRequestHeaders = req.headers.append('Authorization', authHeaders.get('Authorization'));

          return req.clone({ headers: authorizedRequestHeaders });
        }),
        switchMap(request => next.handle(request))
      );
  }
}
