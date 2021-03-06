import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { PasswordComponent } from '../../components/password/password.component';
import { passwordMatchValidator } from '../../components/password/password-match.validator';
import { StorageService } from '../../shared/storage/storage.service';


enum ChangeType {
  UserRequested,
  ForgotPassword,
  ChangeRequired,
  SetupPassword
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  ChangeType = ChangeType;

  changePasswordId: string;
  changeType: ChangeType;
  mainForm: FormGroup;
  showErrorLoginAgain: boolean;
  showErrorUnableToChange: boolean;

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
    this.changePasswordId = this.route.snapshot.paramMap.get('id');
    this.setChangeType();
    this.buildFormGroup();
  }

  setChangeType() {
    const subRoute = this.route.snapshot.url[1].toString();
    if (subRoute === 'change-required') {
      this.changeType = ChangeType.ChangeRequired;
    } else if (subRoute === 'setup') {
      this.changeType = ChangeType.SetupPassword;
    } else if (this.route.snapshot.paramMap.has('id')) {
      this.changeType = ChangeType.ForgotPassword;
    } else {
      this.changeType = ChangeType.UserRequested;
    }
  }

  buildFormGroup() {
    const group: any = {};
    if (this.changeType === ChangeType.UserRequested) {
      group['currentPassword'] = new FormControl('', PasswordComponent.validators);
    }
    group['password'] = new FormControl('', PasswordComponent.validators);
    group['confirmPassword'] = new FormControl('');
    this.mainForm = new FormGroup(group, { validators: passwordMatchValidator });
  }

  submit() {
    this.resetErrorMessages();
    if (this.mainForm.valid) {
      let httpRequest;
      const request = this.mainForm.value;
      delete request.confirmPassword;
      httpRequest = this.fusionAuthService.changePassword(this.changePasswordId, request);
      if (this.changeType !== ChangeType.UserRequested) {
        httpRequest.subscribe((r) => this.handleOtherResponse(r), (e) => this.handleOtherResponse(e));
      } else {
        httpRequest.subscribe((r) => this.handleUserRequestedResponse(r), (e) => this.handleUserRequestedResponse(e));
      }
    }
  }

  resetErrorMessages() {
    this.showErrorUnableToChange = false;
    this.showErrorLoginAgain = false;
  }

  handleOtherResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.navigateOnSuccess(response);
        break;
      case 404:
        this.showErrorUnableToChange = true;
        break;
      default:
        this.showErrorLoginAgain = true;
    }
  }

  navigateOnSuccess(response) {
    if (this.changeType === ChangeType.ChangeRequired) {
      this.loginWithOneTimePassword(response);
    } else {
      const options = (this.changeType === ChangeType.SetupPassword) ?
        { showMessagePasswordSetup: true } :
        { showMessagePasswordChange: true };
      this.router.navigate(['/login', options]);
    }
  }

  handleUserRequestedResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.loginWithOneTimePassword(response as HttpResponse<any>);
        break;
      // TODO: Remove 400 when correct code is in FA build
      case 400:
      case 401:
        this.fusionAuthService
          .exchangeRefreshTokenForJWT({})
          .subscribe(
            (res) => this.submit(),
            (err) => this.showErrorLoginAgain = true
          );
        break;
      case 404:
        this.showErrorUnableToChange = true;
        break;
      default:
        this.showErrorLoginAgain = true;
    }
  }

  loginWithOneTimePassword(response: HttpResponse<any>) {
    const request = {
      device: this.storage.getDeviceId(),
      oneTimePassword: response.body.oneTimePassword
    };
    this.fusionAuthService
      .login(request)
      .subscribe((r) => this.handleLoginSuccess(r), (e) => this.showErrorLoginAgain = true);
  }

  handleLoginSuccess(response: HttpResponse<any>) {
    const body = (response as HttpResponse<any>).body;
    this.angularExampleService
      .setCookies(body)
      .subscribe((r) => this.handleSetCookieSucces(r), (e) => this.showErrorLoginAgain = true);
  }

  handleSetCookieSucces(response: HttpResponse<any>) {
    this.storage.setLoggedIn(true);
    this.router.navigate(['']);
  }
}
