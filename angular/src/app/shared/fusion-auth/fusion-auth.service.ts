import { HttpClient } from '@angular/common/http';
import { HttpRequestBuilder } from '../http-request-builder/http-request-builder';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FusionAuthService {
  applicationId: string;
  baseUrl: string;

  constructor(private http: HttpClient) {
    // TODO: add appId to methods below
    this.applicationId = environment.fusionauth.applicationId;
    this.baseUrl = environment.fusionauth.apiUrl;
  }

  changePassword(changePasswordId, request) {
    return this.start()
      .setUri('/api/user/change-password')
      .addUriSegment(changePasswordId)
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  forgotPassword(request) {
    return this.start()
      .setUri('/api/user/forgot-password')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  login(request) {
    request.applicationId = this.applicationId;
    return this.start()
      .setUri('/api/login')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  logout(globalLogout, refreshToken) {
    return this.start()
      .setHeader('Content-Type', 'text/plain')
      .setUri('/api/logout')
      .setUrlParameter('global', globalLogout)
      .setUrlParameter('refreshToken', refreshToken)
      .setMethod('POST')
      .build();
  }

  resendEmailVerification(email) {
    return this.start()
      .setUri('/api/user/verify-email')
      .setUrlParameter('email', email)
      .setMethod('PUT')
      .build();
  }

  twoFactorLogin(request) {
    request.applicationId = this.applicationId;
    return this.start()
      .setUri('/api/two-factor/login')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  verifyEmail(verificationId) {
    return this.start()
      .setHeader('Content-Type', 'text/plain')
      .setUri('/api/user/verify-email')
      .addUriSegment(verificationId)
      .setMethod('POST')
      .build();
  }

  private start() {
    return new HttpRequestBuilder(this.http)
      .setUrl(this.baseUrl);
  }
}
