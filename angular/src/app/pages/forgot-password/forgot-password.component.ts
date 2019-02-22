import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
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
      loginId: new FormControl('', [ Validators.required ])
    });
  }

  submit() {
    this.resetShowMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .forgotPassword(this.mainForm.value)
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  private resetShowMsg() {
    this.showNotEnabledMsg = false;
    this.showInvalidMsg = false;
    this.showNoEmailMsg = false;
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
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
        break;
      default:
        this.showInvalidMsg = true;
        break;
    }
  }
}
