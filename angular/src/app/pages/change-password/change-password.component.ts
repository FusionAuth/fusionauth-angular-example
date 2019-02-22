import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { PasswordComponent } from '../../components/password/password.component';
import { passwordMatchValidator } from '../../components/password/password-match.validator';


enum ChangeType {
  UserRequested,
  ForgotPassword,
  ChangeRequired
};

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
    private router: Router
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
    const options: any = {};
    if (this.changeType === ChangeType.UserRequested) {
      group['currentPassword'] = new FormControl('', PasswordComponent.validators);
      options['validators'] = passwordMatchValidator;
    }
    group['password'] = new FormControl('', PasswordComponent.validators);
    group['confirmPassword'] = new FormControl('');
    this.mainForm = new FormGroup(group, options);
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
      httpRequest.subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  resetShowMsg() {
    this.showForgotTokenExpiredMsg = false;
    this.showLoginAgainMsg = false;
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        this.navigateOnSuccess();
        break;
      case 404:
        if (this.changeType === ChangeType.ForgotPassword) {
          this.showForgotTokenExpiredMsg = true;
        }
        // Fall through
      default:
        this.showLoginAgainMsg = true;
    }
  }

  navigateOnSuccess() {
    if (this.changeType !== ChangeType.ForgotPassword) {
      this.fusionAuthService
        .login(this.mainForm.get('password'))
        .subscribe((r) => this.handleRelogin(r), (r) => this.handleRelogin(r));
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleRelogin(response: HttpErrorResponse | HttpResponse<any>) {
    const options = (this.changeType === ChangeType.ChangeRequired) ? { showPasswordChangeMsg: true } : {};
    this.router.navigate(['', options]);
  }
}
