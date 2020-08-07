import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordResetService} from '@core/services/password-reset.service';
import {AuthenticationService} from '@core/services/authentication.service';
import {DefaultRouteService} from '@core/services/default-route.service';
import {AuthenticationProviderService} from '@core/services/authentication-provider.service';
import {OauthProviderService} from '@core/services/oauth/oauth-provider.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PasswordResetService,
    AuthenticationService,
    DefaultRouteService,
    { provide: AuthenticationProviderService, useClass: OauthProviderService }
  ]
})
export class CoreModule { }
