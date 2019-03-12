import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { StorageService } from '../../shared/storage/storage.service';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  tryCount: number;
  messages: string[];

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
      this.messages.push('Stopping after 2 tries');
    } else {
      this.tryCount += 1;
      this.messages.push('Requesting response from /api/example');
      this.angularExampleService
        .loadExample()
        .subscribe((r) => this.handleSuccess(r), (e) => this.handleError(e));
    }
  }

  handleSuccess(response: HttpResponse<any>) {
    this.messages.push('Response from /api/example: ' + response.body.message);
  }

  handleError(error: HttpErrorResponse) {
    this.messages.push('Access token expired.  Refreshing.');
    this.fusionAuthService
      .exchangeRefreshTokenForJWT({})
      .subscribe(
        (r) => this.handleRefreshSucess(r),
        (e) => this.handleRefreshError(e)
      );
  }

  handleRefreshSucess(response: HttpResponse<any>) {
    this.messages.push('Setting access token cookie.');
    // TODO: Is this really the right format?? If so, update change-password.
    const body = (response as HttpResponse<any>).body;
    this.angularExampleService
      .setCookies({ token: body.token.access_token })
      .subscribe(
        (r) => setTimeout(() => this.loadExample(), 1),
        (e) => this.messages.push('Set cookie failed.')
      );
  }

  handleRefreshError(error: HttpErrorResponse) {
    this.messages.push('Refresh token expired.');
    this.storage.setLoggedIn(false);
  }
}
