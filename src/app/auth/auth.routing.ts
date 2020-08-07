import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NewPasswordComponent} from './components/new-password/new-password.component';
import {ActivatePasswordComponent} from '@app/auth/components/activate-password/activate-password.component';

const authRoutes: Routes = [
  { path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'reset',
        component: ResetPasswordComponent
      },
      {
        path: 'new',
        component: NewPasswordComponent
      },
      {
        path: 'password',
        component: ActivatePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
