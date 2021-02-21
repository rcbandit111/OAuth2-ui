import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserRoleType} from '@app/panel/domain/user-role-type';
import {RoleGuard} from '@utils/guards/role.guard';

import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserResolver } from '@app/panel/resolvers/user.resolver';
import { UserListResolver } from '@app/panel/resolvers/user-list.resolver';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { PanelComponent } from '@app/panel/panel.component';

import { ErrorsComponent } from '../errors';

import { PreferencesComponent } from '@app/panel/preferences/preferences.component';
import { ResetPasswordComponent } from '@app/panel/preferences/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'totalusers',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: {
          requiredRole: UserRoleType.masterAdmin
        },
        children: [
          {
            path: '',
            component: UserListComponent,
            data: {
              requiredRole: UserRoleType.masterAdmin
            },
            resolve: {
              pagedResult: UserListResolver
            }
          },
          {
            path: 'new',
            component: UserNewComponent,
            pathMatch: 'full',
            data: {
              requiredRole: UserRoleType.masterAdmin
            }
          },
          {
            path: 'edit/:id',
            component: UserEditComponent,
            pathMatch: 'full',
            data: {
              requiredRole: UserRoleType.masterAdmin
            },
            resolve: {
              user: UserResolver
            }
          },
          {
            path: ':id',
            component: UserDetailsComponent,
            data: {
              requiredRole: UserRoleType.masterAdmin
            },
            resolve: {
              user: UserResolver
            }
          },
        ]
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
        canActivate: [RoleGuard],
        data: {
          requiredRole: UserRoleType.masterAdmin
        },
        children: [
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
            data: {
              requiredRole: UserRoleType.masterAdmin
            }
          }
        ]
      },
      // {
      //   path: 'downloads/doc',
      //   component: DownloadComponent,
      //   pathMatch: 'full',
      //   data: {
      //     requiredRole: UserRoleType.admin
      //   }
      // },

      { path: 'error', component: ErrorsComponent },
      { path: '**', component: ErrorsComponent, data: { error: 404 } }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PanelRoutingModule { }
