import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { PasswordComponent } from '../../components/password/password.component';
import { StorageService } from '../../shared/storage/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  mainForm: FormGroup;
  showErrorInvalidLogin: boolean;
  showErrorNotAuthorized: boolean;
  showMessagePasswordChange: boolean;
  showMessagePasswordSetup: boolean;
  showMessageRegistration: boolean;

  constructor(
    private angularExampleService: AngularExampleService,
    private fusionAuthService: FusionAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService
  ) {
    this.resetErrorMessages();
  }

  ngOnInit() {
    this.setupMessages();
    const deviceId = this.storage.getDeviceId();
    this.mainForm = new FormGroup({
      device: new FormControl(deviceId),
      password: new FormControl('', PasswordComponent.validators),
      loginId: new FormControl('', [ Validators.required ])
    });
  }

  setupMessages() {
    const paramMap = this.route.snapshot.paramMap;
    this.showMessagePasswordChange = paramMap.get('showMessagePasswordChange') === 'true';
    this.showMessagePasswordSetup = paramMap.get('showMessagePasswordSetup') === 'true';
    this.showMessageRegistration = paramMap.get('showMessageRegistration') === 'true';
  }

  submit() {
    this.resetErrorMessages();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .login(this.mainForm.value)
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  resetErrorMessages() {
    this.showErrorInvalidLogin = false;
    this.showErrorNotAuthorized = false;
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    const body = (response as HttpResponse<any>).body;
    switch (response.status) {
      case 200:
        this.angularExampleService
          .setCookies(body)
          .subscribe((r) => this.handleCookieResponse(r), (e) => this.handleCookieResponse(e));
        break;
      case 202:
        this.showErrorNotAuthorized = true;
        break;
      case 203:
        this.router.navigate(['/password/change-required', body.changePasswordId]);
        break;
      case 242:
        this.router.navigate(['/login/two-factor', body.twoFactorId ]);
        break;
      default:
       this.showErrorInvalidLogin = true;
    }
  }

  handleCookieResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.storage.setLoggedIn(true);
        this.router.navigate(['']);
        break;
      default:
       this.showErrorInvalidLogin = true;
    }
  }
}
