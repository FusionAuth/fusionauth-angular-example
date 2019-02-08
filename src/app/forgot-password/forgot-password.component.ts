import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


import { FusionAuthService } from '../fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  showNotEnabledMsg: boolean;
  showInvalidMsg: boolean;
  showNoEmailMsg: boolean;
  mainForm: FormGroup;

  constructor(private fusionAuthService: FusionAuthService, private router: Router) {
    this.resetShowMsg();
  }

  ngOnInit() {
    this.mainForm = new FormGroup({
      username: new FormControl('', [ Validators.required ])
    });
    // TODO: Remove before release
    this.mainForm.get('username').setValue('angular@fusionauth.io');
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .forgotPassword({
          'loginId': this.mainForm.get('username').value
        })
        .subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  private resetShowMsg() {
    this.showNotEnabledMsg = false;
    this.showInvalidMsg = false;
    this.showNoEmailMsg = false;
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        this.router.navigate(['/password/sent']);
        break;
      case 403:
        this.showNotEnabledMsg = true;
        break;
      case 404:
        this.showInvalidMsg = true;
        break;
      case 422:
        this.showNoEmailMsg = true;
      default:
        // TODO:
        // this.showOtherMsg = true;
    }
  }
}
