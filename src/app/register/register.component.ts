import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PasswordComponent } from '../password/password.component';
import { passwordValidator, PasswordErrorMatcher } from './register.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  applicationId: string;
  passwordErrorMatcher = new PasswordErrorMatcher();
  showMsg = false;
  mainForm = new FormGroup({
    confirmPassword: new FormControl('', PasswordComponent.validators),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl('', PasswordComponent.validators)
  }, {
    validators: passwordValidator
  });

  constructor(private fusionAuthService: FusionAuthService, private router: Router) {
    this.applicationId = environment.fusionauth.applicationId;
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .register(null, {
          registration: {
            applicationId: this.applicationId
          },
          user: {
            email: this.mainForm.get('email').value,
            firstName: this.mainForm.get('firstName').value,
            lastName: this.mainForm.get('lastName').value,
            password: this.mainForm.get('password').value
          }
        })
        .subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  private resetShowMsg() {
    this.showMsg = false;
  }

  handleFailure(error: HttpErrorResponse) {
    // TODO: 400 with error.fieldErrors.user.email[0] =
    //   {code: "[duplicate]user.email", message: "A User with email = [test1@testerson.com] already exists."}
    this.showMsg = true;
    console.log(error);
  }

  handleSuccess(response: HttpResponse<any>) {
    this.router.navigate(['/login', { showRegistrationMsg: true }]);
  }
}
