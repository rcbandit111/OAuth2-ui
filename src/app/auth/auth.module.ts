import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from './auth.routing';
import {ReactiveFormsModule} from '@angular/forms';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import {SharedModule} from '@shared/shared.module';
import { ActivatePasswordComponent } from './components/activate-password/activate-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    AuthComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ActivatePasswordComponent
  ]
})
export class AuthModule { }
