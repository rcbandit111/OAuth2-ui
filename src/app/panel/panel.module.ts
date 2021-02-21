import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { LinearChartComponent } from './dashboard/linear-chart/linear-chart.component';

import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { DownloadComponent } from './downloads/download.component';
import { AccordionModule, PaginationModule } from 'ngx-bootstrap';
import { PanelRoutingModule } from './panel-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormatTypePipe } from './common/format-type.pipe';
import { PanelComponent } from './panel.component';
import { SharedModule } from '@shared/shared.module';

import { UserResolver } from '@app/panel/resolvers/user.resolver';
import { UserListResolver } from '@app/panel/resolvers/user-list.resolver';

import { ChartModule } from 'angular2-chartjs';
import { PreferencesComponent } from './preferences/preferences.component';
import { ResetPasswordComponent } from './preferences/reset-password/reset-password.component';
import { NgHighlightModule } from 'ngx-text-highlight';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    AccordionModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PaginationModule.forRoot(),
    NgHighlightModule
  ],
  declarations: [
    DashboardComponent,
    BarChartComponent,
    LinearChartComponent,

    UserComponent,
    UserNewComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,

    FormatTypePipe,
    DownloadComponent,
    PanelComponent,

    PreferencesComponent,
    ResetPasswordComponent,
  ],
  exports: [
    PanelRoutingModule,
    FormatTypePipe,
    NgHighlightModule
  ],
  providers: [
    UserResolver,
    UserListResolver,
  ]
})
export class PanelModule {
}
