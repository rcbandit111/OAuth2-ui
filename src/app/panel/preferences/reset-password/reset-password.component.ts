import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '@app/panel/service/breadcrumb.service';
import { IUserReset } from '@utils/interfaces';
import { UserReset } from '@utils/models';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormBaseComponent } from '@shared/components/form-base/form-base.component';
import { PasswordResetService } from '@core/services/password-reset.service';
import { OauthTokenStorageService } from '@core/services/oauth/oauth-token-storage.service';
import { OauthProviderService } from '@core/services/oauth/oauth-provider.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends FormBaseComponent implements OnInit {

  formErrors = {
    isEqual: 'New password confirmation doesn\'t match New password',
    pattern: 'Must contain a lowercase letter, an uppercase letter and a digit.'
  };

  invalidToken = false;
  serverException = false;
  success = false;

  serverError: 'CONFIRMATION_PASSWORD_MISMATCH' | 'OLD_PASSWORD_MISMATCH' | 'PASSWORD_ALREADY_USED';

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/;

  passwordValidations = [Validators.required, Validators.maxLength(255), Validators.minLength(9), Validators.pattern(this.passwordRegex)];

  formGroup = new FormGroup({
    oldPassword: new FormControl(null, this.passwordValidations),
    password: new FormControl(null, this.passwordValidations),
    confirmPassword: new FormControl(null, this.passwordValidations)
  }, this.isPasswordsEqual());

  constructor(private breadcrumbService: BreadcrumbService,
    private resetService: PasswordResetService,
    private tokenStorage: OauthTokenStorageService,
    private oauthProviderService: OauthProviderService) {
    super();
  }

  ngOnInit() {
    this.breadcrumbService.setItems([{name: 'Reset password'}]);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.loading = true;
      this.serverError = null;
      this.serverException = this.success = false;
      const userData = this.oauthProviderService.active();
      const user: IUserReset = new UserReset({name: userData.username, ...this.formGroup.value});

      this.resetService.resetUserPassword(user).subscribe(() => {
          this.loading = false;
          this.formGroup.enable();
          this.success = true;
          this.formGroup.reset();
        },
        error => {
          this.loading = false;
          this.formGroup.enable();

          console.log(error);

          switch (error.status) {
            case 400:
              this.serverException = true;
              this.serverError = error.error;
              break;
            case 500:
              this.serverException = true;
              break;
          }
        });
    }
  }

  private isPasswordsEqual(): ValidatorFn {
    return () => {
      return  !this.formGroup.value.password || !this.formGroup.value.confirmPassword || this.formGroup.value.password === this.formGroup.value.confirmPassword ? null : {isEqual: false};
    };
  }

}
