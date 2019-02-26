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
  ChangeRequired
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
  showForgotTokenExpiredMsg: boolean;
  showLoginAgainMsg: boolean;

  constructor(
    private angularExampleService: AngularExampleService,
    private fusionAuthService: FusionAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService
  ) {
    this.resetShowMsg();
  }

  ngOnInit() {
    this.changePasswordId = this.route.snapshot.paramMap.get('id');
    this.setChangeType();
    this.buildFormGroup();
  }

  setChangeType() {
    if (this.route.snapshot.paramMap.get('showChangeRequiredMsg') === 'true') {
      this.changeType = ChangeType.ChangeRequired;
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
    this.resetShowMsg();
    if (this.mainForm.valid) {
      let httpRequest;
      const request = this.mainForm.value;
      delete request.confirmPassword;
      if (this.changeType === ChangeType.UserRequested) {
        httpRequest = this.angularExampleService.changePassword(request);
      } else {
        httpRequest = this.fusionAuthService.changePassword(this.changePasswordId, request);
      }
      httpRequest.subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  resetShowMsg() {
    this.showForgotTokenExpiredMsg = false;
    this.showLoginAgainMsg = false;
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.navigateOnSuccess();
        break;
      case 404:
        if (this.changeType === ChangeType.ForgotPassword) {
          this.showForgotTokenExpiredMsg = true;
        } else {
          this.showLoginAgainMsg = true;
        }
        break;
      default:
        this.showLoginAgainMsg = true;
    }
  }

  navigateOnSuccess() {
    if (this.changeType !== ChangeType.ForgotPassword) {
      // TODO: This is a hack! Eventually we will have a OTP and will not need email to relogin.
      const request = {
        device: this.storage.getDeviceId(),
        loginId: localStorage.getItem('fusionauth.loginId'),
        password: this.mainForm.get('password').value
      };
      // TODO: END
      this.fusionAuthService
        .login(request)
        .subscribe((r) => this.handleRelogin(r), (e) => this.handleRelogin(e));
    } else {
      this.router.navigate(['/login', { showPasswordChangeMsg: true }]);
    }
  }

  handleRelogin(response: HttpResponse<any> | HttpErrorResponse) {
    const body = (response as HttpResponse<any>).body;
    switch (response.status) {
      case 200:
        this.storage.setAccessToken(body.token);
        this.router.navigate(['']);
        break;
      case 242:
        this.router.navigate(['/login/two-factor', body.twoFactorId ]);
        break;
      default:
        // TODO: Once 242 is gone and OTP works, should we add a message that something went wrong?
        this.router.navigate(['/login']);
    }

  }
}
