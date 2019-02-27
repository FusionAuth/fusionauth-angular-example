import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { StorageService } from '../../shared/storage/storage.service';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private fusionAuthService: FusionAuthService, private storage: StorageService) { }

  ngOnInit() {
    this.isLoggedIn = this.storage.getAccessToken() !== null;
  }

  logout() {
    this.fusionAuthService
      .logout(null, null)
      .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    this.storage.setAccessToken(null);
    this.isLoggedIn = false;
  }
}
