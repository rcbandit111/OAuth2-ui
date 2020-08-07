import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { DashboardService } from '@app/panel/service/dashboard.service';
import { BreadcrumbService } from '@app/panel/service/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  navigationSubscription: any;
  volumes: any[] = [];
  currency: string;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  init() {
    this.volumes = [];
    this.currency = 'USD';
    this.breadcrumbService.setItems([{ name: 'Overview' }]);
    this.getVolumes(this.currency);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getVolumes(currency: string) {
    this.currency = currency;
    this.dashboardService.volumes(currency)
      .subscribe(v => {
        this.volumes = v;
      });
  }

  filterByCurrency(currency: string) {
    this.getVolumes(currency);
  }

}
