import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


enum VerificationStatus {
  VerifyingEmail,
  EmailVerified,
  InvalidToken
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  VerificationStatus = VerificationStatus;

  mainForm: FormGroup;
  showErrorInvalidCode: boolean;
  showErrorResendFailed: boolean;
  verificationStatus: VerificationStatus;

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
    this.resetMsg();
    this.verificationStatus = VerificationStatus.VerifyingEmail;
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
        this.verificationStatus = VerificationStatus.EmailVerified;
        break;
      case 404:
        this.verificationStatus = VerificationStatus.InvalidToken;
        this.showErrorInvalidCode = true;
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
    this.showErrorInvalidCode = false;
    this.showErrorResendFailed = false;
  }

  handleResendResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        this.router.navigate(['/verify/sent']);
        break;
      default:
        this.showErrorResendFailed = true;
        break;
    }
  }
}
