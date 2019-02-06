import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showPassword = false;
  showInvalidMsg = false;
  showRegistrationMsg = false;

  loginForm = new FormGroup({
    password: new FormControl('', [ Validators.required ]),
    username: new FormControl('', [ Validators.required ])
  });

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService) {
    this.loginForm.get('username').setValue('angular');
    this.loginForm.get('password').setValue('password');
    this.showPassword = false;
  }

  ngOnInit() {
    this.showRegistrationMsg = this.route.snapshot.paramMap.get('showRegistrationMsg') === 'true';
  }

  submit() {
    this.showInvalidMsg = false;
    if (this.loginForm.valid) {
      this.fusionAuthService
        .login({
          'loginId': this.loginForm.get('username').value,
          'password': this.loginForm.get('password').value
        })
        .subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  handleFailure(error: HttpErrorResponse) {
    this.showInvalidMsg = true;
  }

  handleSuccess(response: HttpResponse<any>) {
    // Navigate to page?
  }
}
