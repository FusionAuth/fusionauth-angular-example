import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordId: string;
  isChangeByIdentity: boolean;
  showInvalidMsg: boolean;
  showExpiredMsg: boolean;
  showOtherMsg: boolean;
  showNewPassword: boolean;
  showOldPassword: boolean;
  mainForm: FormGroup;

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService) {
    this.showNewPassword = false;
    this.showOldPassword = false;
    this.resetShowMsg();
  }

  ngOnInit() {
    this.changePasswordId = this.route.snapshot.paramMap.get('id');
    this.isChangeByIdentity = !this.route.snapshot.paramMap.has('id');

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
      httpRequest.subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  private resetShowMsg() {
    this.showInvalidMsg = false;
    this.showExpiredMsg = false;
    this.showOtherMsg = false;
  }

  handleFailure(error: HttpErrorResponse) {
    if (error.status === 404) {
      if (this.isChangeByIdentity) {
        this.showInvalidMsg = true;
      } else {
        this.showExpiredMsg = true;
      }
    } else {
      this.showOtherMsg = true;
    }
  }

  handleSuccess(response: HttpResponse<any>) {
    console.log(response);
  }
}
