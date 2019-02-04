import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {
  showNotEnabledMsg: boolean;
  showInvalidMsg: boolean;
  showNoEmailMsg: boolean;
  mainForm = new FormGroup({
    username: new FormControl('', [ Validators.required ])
  });

  constructor(private fusionAuthService: FusionAuthService) {
    this.mainForm.get('username').setValue('angular@fusionauth.io');
    this.resetShowMsg();
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .forgotPassword({
          'loginId': this.mainForm.get('username').value
        })
        .subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  private resetShowMsg() {
    this.showNotEnabledMsg = false;
    this.showInvalidMsg = false;
    this.showNoEmailMsg = false;
  }

  handleFailure(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.showNotEnabledMsg = true;
    }
    if (error.status === 404) {
      this.showInvalidMsg = true;
    }
    if (error.status === 422) {
      this.showNoEmailMsg = true;
    }
  }

  handleSuccess(response: HttpResponse<any>) {
    // this.router.navigate(['/user/change-password'], { queryParams: { changePasswordId: response.changePasswordId } });
  }
}
