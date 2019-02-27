import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpRequestBuilder } from '../http-request-builder/http-request-builder';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AngularExampleService {
  applicationId: string;
  baseUrl: string;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.applicationId = environment.fusionauth.applicationId;
    this.baseUrl = environment.angularExample.apiUrl;
  }

  changePassword(request) {
    request.accessToken = this.storage.getAccessToken();
    return this.start()
      .setUri('/api/user/change-password')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  register(user) {
    const request = {
      registration: {
        applicationId: this.applicationId
      },
      user: user
    };

    return this.start()
      .setUri('/api/user/registration')
      .setJsonBody(request)
      .setMethod('POST')
      .build();
  }

  private start() {
    return new HttpRequestBuilder(this.http)
      .setUrl(this.baseUrl);
  }
}
