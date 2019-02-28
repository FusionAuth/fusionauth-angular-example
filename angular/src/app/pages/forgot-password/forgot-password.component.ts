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
  mainForm: FormGroup;
  showErrorInvalidEmail: boolean;
  showErrorNoEmail: boolean;
  showErrorNotEnabled: boolean;

  constructor(private fusionAuthService: FusionAuthService, private router: Router) {
    this.resetErrorMessages();
  }

  ngOnInit() {
    this.mainForm = new FormGroup({
      loginId: new FormControl('', [ Validators.required ])
    });
  }

  submit() {
    this.resetErrorMessages();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .forgotPassword(this.mainForm.value)
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  private resetErrorMessages() {
    this.showErrorNotEnabled = false;
    this.showErrorInvalidEmail = false;
    this.showErrorNoEmail = false;
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.router.navigate(['/password/sent']);
        break;
      case 403:
        this.showErrorNotEnabled = true;
        break;
      case 404:
        this.showErrorInvalidEmail = true;
        break;
      case 422:
        this.showErrorNoEmail = true;
        break;
      default:
        this.showErrorInvalidEmail = true;
        break;
    }
  }
}
