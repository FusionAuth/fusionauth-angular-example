import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { StorageService } from '../../shared/storage/storage.service';


enum MessageType {
  Stopping,
  RequestingExample,
  ResponseReceived,
  AccessTokenExpired,
  SettingCookie,
  SetCookieFailed,
  ResfreshTokenExpired
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  MessageType = MessageType;

  tryCount: number;
  messages: { messageType: MessageType, response?: string }[];

  constructor(
    private angularExampleService: AngularExampleService,
    private fusionAuthService: FusionAuthService,
    private storage: StorageService
  ) {
    this.tryCount = 0;
    this.messages = [];
  }

  ngOnInit() {
    this.loadExample();
  }

  loadExample() {
    if (this.tryCount > 1) {
      this.messages.push({ messageType: MessageType.Stopping });
    } else {
      this.tryCount += 1;
      this.messages.push({ messageType: MessageType.RequestingExample });
      this.angularExampleService
        .loadExample()
        .subscribe((r) => this.handleSuccess(r), (e) => this.handleError(e));
    }
  }

  handleSuccess(response: HttpResponse<any>) {
    this.messages.push({ messageType: MessageType.ResponseReceived, response: response.body.message });
  }

  handleError(error: HttpErrorResponse) {
    this.messages.push({ messageType: MessageType.AccessTokenExpired });
    this.fusionAuthService
      .exchangeRefreshTokenForJWT({})
      .subscribe(
        (r) => this.handleRefreshSucess(r),
        (e) => this.handleRefreshError(e)
      );
  }

  handleRefreshSucess(response: HttpResponse<any>) {
    this.messages.push({ messageType: MessageType.SettingCookie });
    // TODO: Is this really the right format?? If so, update change-password.
    const body = (response as HttpResponse<any>).body;
    this.angularExampleService
      .setCookies({ token: body.token.access_token })
      .subscribe(
        (r) => setTimeout(() => this.loadExample(), 1),
        (e) => this.messages.push({ messageType: MessageType.SetCookieFailed })
      );
  }

  handleRefreshError(error: HttpErrorResponse) {
    this.messages.push({ messageType: MessageType.ResfreshTokenExpired });
    this.storage.setLoggedIn(false);
  }
}
