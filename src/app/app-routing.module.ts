import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@utils/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'panel',
    loadChildren: './panel/panel.module#PanelModule',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
