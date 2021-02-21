import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DownloadService } from '@app/panel/service/download.service';
import {AuthenticationService} from '@core/services/authentication.service';
import {UserRoleType} from '@app/panel/domain/user-role-type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @ViewChild('mainMenu') mainMenu: ElementRef;

  timer = null;
  menuItems = [
    {
      type: 'sub-header',
      title: 'Layouts',
    },
    {
      type: 'menu-item',
      uri: '/panel/dashboard',
      title: 'Dashboard',
      icon: 'os-icon os-icon-layout',
      requiredRole: UserRoleType.masterAdmin,
      subMenu: {
        title: 'Dashboard',
        icon: 'os-icon os-icon-layout',
        links: [
          {
            uri: '/panel/dashboard',
            title: 'Overview',
            icon: 'os-icon-layout',
            requiredRole: UserRoleType.masterAdmin
          }
        ]
      }
    },
    {
      type: 'menu-item',
      uri: '/panel/users',
      title: 'Users',
      icon: 'os-icon os-icon-users',
      requiredRole: UserRoleType.masterAdmin,
      subMenu: {
        title: 'Users',
        icon: 'os-icon os-icon-users',
        requiredRole: UserRoleType.masterAdmin,
        links: [
          {
            uri: '/panel/users',
            title: 'Admin Users',
            icon: 'os-icon os-icon-layout',
            requiredRole: UserRoleType.masterAdmin
          }
        ]
      }
    },
    {
      type: 'menu-item',
      uri: '/panel/apiattempts',
      title: 'Downloads',
      icon: 'entypo-icon-download',
      requiredRole: UserRoleType.masterAdmin,
      subMenu: {
        title: 'Downloads',
        icon: 'entypo-icon-download',
        requiredRole: UserRoleType.masterAdmin,
        links: [
          {
            uri: '/panel/downloads/doc',
            title: 'API Documentation',
            requiredRole: UserRoleType.masterAdmin,
            isApiPdf: true
          },
          {
            uri: '/panel/notifications',
            title: 'User Guide',
            requiredRole: UserRoleType.masterAdmin
          },
        ]
      }
    },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private downloadService: DownloadService
  ) { }

  isVisible(requiredRoles?: string | string[]): boolean {
    if (requiredRoles) {
      return this.authService.isAuthorized(requiredRoles);
    }
    return true;
  }

  navigateTo(item: any) {
    if (item && item.uri) {
      if (item.isApiPdf) {
        this.downloadService.downloadPDF().subscribe(res => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL, '_blank');
        });
      } else {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
        this.router.navigate([item.uri], { skipLocationChange: false });
      }
    }
  }

  getIconClass(item: any): object {
    const result = {};
    result[item.icon] = true;
    return result;
  }

  onMenuItemMouseEnter(event, item): void {
    if (!item.subMenu || !item.subMenu.links || item.subMenu.links.length === 0) {
      return;
    }

    if (this.mainMenu && this.mainMenu.nativeElement) {
      (<Element>this.mainMenu.nativeElement).classList.add('has-active');
    }
    event.srcElement.classList.add('active');
  }

  onMenuItemMouseLeave(event, item): void {
    if (!item.subMenu || !item.subMenu.links || item.subMenu.links.length === 0) {
      return;
    }

    this.timer = setTimeout(() => {
      event.srcElement.classList.remove('active');
      if (this.mainMenu && this.mainMenu.nativeElement) {
        (<Element>this.mainMenu.nativeElement).classList.remove('has-active');
      }
    }, 30);
  }
}
