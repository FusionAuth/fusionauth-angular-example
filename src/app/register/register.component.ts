import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PasswordComponent } from '../password/password.component';
import { passwordValidator, PasswordErrorMatcher } from './register.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  applicationId: string;
  passwordErrorMatcher: PasswordErrorMatcher;
  showDuplicateMsg: boolean;
  mainForm: FormGroup;

  constructor(private fusionAuthService: FusionAuthService, private router: Router) {
    this.applicationId = environment.fusionauth.applicationId;
    this.showDuplicateMsg = false;
  }

  ngOnInit() {
    this.passwordErrorMatcher = new PasswordErrorMatcher();
    this.mainForm = new FormGroup({
      confirmPassword: new FormControl('', PasswordComponent.validators),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl('', PasswordComponent.validators)
    }, {
      validators: passwordValidator
    });
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      const user = this.mainForm.value;
      delete user.confirmPassword;
      this.fusionAuthService
        .register(null, {
          registration: {
            applicationId: this.applicationId
          },
          user: user
        })
        .subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  private resetShowMsg() {
    this.showDuplicateMsg = false;
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        // TODO: Can we detect if verification is required?  Then message with email sent or send them to login.
        this.router.navigate(['/login', { showRegistrationMsg: true }]);
        break;
      case 400:
        // TODO: Handle 400 with error.fieldErrors.user.email[0] =
        //   {code: "[duplicate]user.email", message: "A User with email = [test1@testerson.com] already exists."}
        this.showDuplicateMsg = true;
        break;
    }
  }
}
