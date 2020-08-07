import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { BreadcrumbService } from '@app/panel/service/breadcrumb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public breadcrumbService: BreadcrumbService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

}
