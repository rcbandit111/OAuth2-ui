import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '@utils/interfaces';
import {User} from '@utils/models';
import { BreadcrumbService } from '@app/panel/service/breadcrumb.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: IUser = new User();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.setItems([{ name: 'Admin Users', slug: '/panel/users' }, { name: 'Details' }]);
    const user = this.route.snapshot.data['user'];

    if (!user) {
      this.router.navigate(['panel', 'users']);
    }

    this.user = user;
  }
}
