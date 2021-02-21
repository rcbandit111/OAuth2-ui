import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { BreadcrumbService } from '@app/panel/service/breadcrumb.service';
import { Router } from '@angular/router';
import { User } from '@utils/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@shared/components/form-base/form-base.component';

import {UserRoleType, AdminRoleType2LabelMapping} from '../../domain/user-role-type';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent extends FormBaseComponent implements OnInit {

  public adminRoleType2LabelMapping = AdminRoleType2LabelMapping;
  public roleTypes = Object.values(UserRoleType).filter(value => AdminRoleType2LabelMapping[value]);

  user: User = new User();
  loginValueExists = false;
  emailValueExists = false;

  requestInProgress = false;

  formGroup = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    role: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    enabled: new FormControl(false),
  });

  constructor(private userService: UserService,
    private router: Router,
    private breadcrumbService: BreadcrumbService) {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([{ name: ' Admin Users', slug: '/panel/users' }, { name: 'New' }]);
  }

  clear() {
    this.formGroup.get('login').reset(null);
    this.formGroup.get('email').reset(null);
    this.formGroup.get('firstName').reset(null);
    this.formGroup.get('lastName').reset(null);
    this.formGroup.get('role').reset('');
    this.formGroup.get('enabled').reset(null);
  }

  submit() {
    if (this.formGroup.valid) {
      this.requestInProgress = true;
      this.user.login = this.formGroup.get('login').value;
      this.user.email = this.formGroup.get('email').value;
      this.user.firstName = this.formGroup.get('firstName').value;
      this.user.lastName = this.formGroup.get('lastName').value;
      this.user.role = this.formGroup.get('role').value;
      this.user.enabled = this.formGroup.get('enabled').value;

      this.userService.save(this.user).subscribe(() => {
        this.requestInProgress = true;
        this.router.navigate(['panel', 'users'])
          .then(() => this.requestInProgress = false);
        },
        error => this.handleError(error.error));
                       this.requestInProgress = false;
    }
  }

  handleError(error: string) {
    if (error === 'USER_EXISTS') {
      this.loginValueExists = true;
    }
    if (error === 'EMAIL_EXISTS') {
      this.emailValueExists = true;
    }
  }
}
