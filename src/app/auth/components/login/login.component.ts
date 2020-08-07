import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBaseComponent} from '@shared/components/form-base/form-base.component';
import {AuthenticationService} from '@core/services/authentication.service';
import {DefaultRouteService} from '@core/services/default-route.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  loginFailed = false;
  ready = false;

  originalTargetUrl: string;
  preservedQueryParams = null;

  requestInProgress = false;

  formErrors = {
    pattern: 'Must contain a lowercase letter, an uppercase letter and a digit.'
  };

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/;

  passwordValidations = [Validators.required, Validators.maxLength(255), Validators.minLength(9), Validators.pattern(this.passwordRegex)];

  formGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, this.passwordValidations)
  });

  constructor(private auth: AuthenticationService,
    private router: Router,
    private defaultRouter: DefaultRouteService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.originalTargetUrl = params.get('redirectUrl');

        if (params.keys.length > 1) {
          this.preservedQueryParams = { queryParams: {} };

          params.keys
            .filter(key => key !== 'redirectUrl')
            .forEach(key => this.preservedQueryParams.queryParams[key] = params['params'][key]);

        }
        if (this.auth.isAuthorized()) {
          this.redirect();
        } else {
          this.ready = true;
        }
      });


    if (this.authService.authMessage == "tokenExpired")
      setTimeout(() => {
        this.toastr.info('', 'Token expired. Try reset password again', {
          timeOut: 5000,
          positionClass: 'toast-top-center'
        });
      }, 0);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.requestInProgress = true;
      const values = {...this.formGroup.value};
      this.auth.login(values.username, values.password)
        .subscribe((loggedIn) => {
          this.formGroup.enable();
          if (!loggedIn) {
            this.loginFailed = true;
            return;
          }

          this.redirect();
        }, (error) => {
          this.loginFailed = true;
          this.requestInProgress = false;
        });
    }
  }

  redirect(): void {
    if (this.originalTargetUrl) {
      if (this.preservedQueryParams) {
        this.router.navigate([this.originalTargetUrl], this.preservedQueryParams);
      } else {
        this.router.navigate([this.originalTargetUrl]);
      }

      return;
    }

    this.defaultRouter.redirectToDefault();
  }

  resetPassword(): void {
    this.router.navigate(['auth', 'reset']);
  }
}
