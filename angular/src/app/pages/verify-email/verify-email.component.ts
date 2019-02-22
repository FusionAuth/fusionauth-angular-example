import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  mainForm: FormGroup;
  showResendErrorMsg: boolean;
  showInvalidMsg: boolean;
  verificationStatus: string;

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
    this.resetMsg();
    this.verificationStatus = 'verifyingEmail';
  }

  ngOnInit() {
    this.mainForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ])
    });
    const verificationId = this.route.snapshot.paramMap.get('id');
    this.fusionAuthService
      .verifyRegistration(verificationId)
      .subscribe((r) => this.handleVerifyResponse(r), (e) => this.handleVerifyResponse(e));
  }

  handleVerifyResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.verificationStatus = 'emailVerified';
        break;
      case 404:
        this.verificationStatus = 'invalidToken';
        this.showInvalidMsg = true;
        break;
    }
  }

  submit() {
    this.resetMsg();
    if (this.mainForm.valid) {
      this.fusionAuthService
        .resendRegistrationVerification(this.mainForm.value.email)
        .subscribe((r) => this.handleResendResponse(r), (e) => this.handleResendResponse(e));
    }
  }

  resetMsg() {
    this.showInvalidMsg = false;
    this.showResendErrorMsg = false;
  }

  handleResendResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.router.navigate(['/verify/sent']);
        break;
      default:
        this.showResendErrorMsg = true;
        break;
    }
  }
}
