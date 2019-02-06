import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { passwordValidator, PasswordErrorMatcher } from './register.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  passwordErrorMatcher = new PasswordErrorMatcher();
  showPassword = false;
  showConfirmPassword = false;
  showMsg = false;
  mainForm = new FormGroup({
    confirmPassword: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl('', [ Validators.required ])
  }, {
    validators: passwordValidator
  });

  constructor(private fusionAuthService: FusionAuthService, private router: Router) { }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .register(null, {
          registration: {
            applicationId: 'ad020c90-e0c8-4173-b914-d1409b9a5da9'
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
    this.showMsg = true;
    console.log(error);
  }

  handleSuccess(response: HttpResponse<any>) {
    this.router.navigate(['/login', { showRegistrationMsg: true }]);
  }
}
