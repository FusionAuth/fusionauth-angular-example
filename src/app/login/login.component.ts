import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusionauth/fusionauth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hidePassword = true;
  hideInvalidLogin = true;
  loginForm = new FormGroup({
    password: new FormControl('', [ Validators.required ]),
    username: new FormControl('', [ Validators.required ])
  });

  constructor(private fusionAuthService: FusionAuthService) {
    this.loginForm.get('username').setValue('angular');
    this.loginForm.get('password').setValue('angulario!');
  }

  login() {
    if (this.loginForm.valid) {
      this.fusionAuthService
        .login({
          'loginId': this.loginForm.get('username').value,
          'password': this.loginForm.get('password').value
          //'applicationId': 'f60bbe99-db20-47a1-bc86-3c96146a1fcd'
        })
        .subscribe((e) => this.handleLoginSuccess(e), (r) => this.handleLoginFailure(r));
    }
  }

  handleLoginFailure(error: HttpErrorResponse) {
    this.hideInvalidLogin = false;
  }

  handleLoginSuccess(response: HttpResponse<any>) {
    // Navigate to page?
  }
}
