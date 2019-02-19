import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PasswordComponent } from '../password/password.component';
import { passwordValidator, PasswordErrorMatcher } from './register.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  apiUrl: string;
  applicationId: string;
  mainForm: FormGroup;
  passwordErrorMatcher: PasswordErrorMatcher;
  showDuplicateMsg: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.applicationId = environment.fusionauth.applicationId;
    this.apiUrl = environment.registration.apiUrl;
    this.showDuplicateMsg = false;
  }

  ngOnInit() {
    this.passwordErrorMatcher = new PasswordErrorMatcher();
    this.mainForm = new FormGroup({
      confirmPassword: new FormControl('password', PasswordComponent.validators),
      email: new FormControl('brett+t' + Date.now() + '@fusionauth.io', [ Validators.required, Validators.email ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl('password', PasswordComponent.validators)
    }, {
      validators: passwordValidator
    });
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      const user = this.mainForm.value;
      delete user.confirmPassword;
      const json = {
        registration: {
          applicationId: this.applicationId
        },
        user: user
      };
      this.http
        .post(this.apiUrl + '/user/registration', json, { observe: 'response' })
        .subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  private resetShowMsg() {
    this.showDuplicateMsg = false;
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        if ((response as HttpResponse<any>).body.user.verified) {
          this.router.navigate(['/login', { showRegistrationMsg: true }]);
        } else {
          this.router.navigate(['/verify/sent']);
        }
        break;
      case 400:
        // TODO: Handle 400 with error.fieldErrors.user.email[0] =
        //   {code: "[duplicate]user.email", message: "A User with email = [test1@testerson.com] already exists."}
        this.showDuplicateMsg = true;
        break;
    }
  }
}
