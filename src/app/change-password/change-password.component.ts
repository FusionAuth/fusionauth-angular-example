import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { FusionAuthService } from '../fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordId: string;
  isChangeByIdentity: boolean;
  mainForm: FormGroup;
  showExpiredMsg: boolean;
  showInvalidMsg: boolean;
  showNewPassword: boolean;
  showOldPassword: boolean;
  showOtherMsg: boolean;

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
    this.showNewPassword = false;
    this.showOldPassword = false;
    this.resetShowMsg();
  }

  ngOnInit() {
    this.changePasswordId = this.route.snapshot.paramMap.get('id');
    this.isChangeByIdentity = !this.route.snapshot.paramMap.has('id');
    this.buildFormGroup();
  }

  buildFormGroup() {
    const group: any = {};
    group['newPassword'] = new FormControl('', [ Validators.required ]);
    if (this.isChangeByIdentity) {
      group['username'] = new FormControl('', [ Validators.required ]);
      group['oldPassword'] = new FormControl('', [ Validators.required ]);
    }
    this.mainForm = new FormGroup(group);
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      const password = this.mainForm.get('newPassword').value;
      let request;
      let httpRequest;
      if (this.isChangeByIdentity) {
        request = {
          password: password,
          currentPassword: this.mainForm.get('oldPassword').value,
          loginId: this.mainForm.get('username').value
        };
        httpRequest = this.fusionAuthService.changePasswordByIdentity(request);
      } else {
        request = {
          password: password
        };
        httpRequest = this.fusionAuthService.changePassword(this.changePasswordId, request);
      }
      httpRequest.subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  private resetShowMsg() {
    this.showInvalidMsg = false;
    this.showExpiredMsg = false;
    this.showOtherMsg = false;
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        this.router.navigate(['/login', { showPasswordChangeMsg: true }]);
        break;
      case 400:
        // TODO: How much messaging do we want to handle here?
        // We could also write a password validator to match defaults for fusionauth
        console.log(response);
        break;
      case 404:
        if (this.isChangeByIdentity) {
          this.showInvalidMsg = true;
        } else {
          this.showExpiredMsg = true;
        }
        break;
      default:
        this.showOtherMsg = true;
    }
  }
}
