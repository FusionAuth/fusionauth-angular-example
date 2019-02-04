import { HttpClient } from '@angular/common/http';
import { HttpRequestBuilder } from '../http-request-builder/http-request-builder';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FusionAuthService {
  baseUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://fusionauth.local:9011';
    this.apiKey = 'afQM46wknFeOLoglTmIhRuEUcl4nUugw0LasKpVCsDQ';
  }

  changePassword(changePasswordId, request) {
    return this.start()
      .setUri('/api/user/change-password')
      .addUriSegment(changePasswordId)
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  changePasswordByIdentity(request) {
    return this.start()
      .setUri('/api/user/change-password')
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
    return this.start()
      .setUri('/api/login')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  private start() {
    return new HttpRequestBuilder(this.http)
      .setHeader('Authorization', this.apiKey)
      .setUrl(this.baseUrl);
  }
}
