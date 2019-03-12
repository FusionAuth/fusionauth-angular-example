import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { StorageService } from '../../shared/storage/storage.service';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private angularExampleService: AngularExampleService,
    private fusionAuthService: FusionAuthService,
    private storage: StorageService) { }

  ngOnInit() {
    this.isLoggedIn = this.storage.getLoggedIn();
  }

  logout() {
    this.fusionAuthService
      .logout(null, null)
      .subscribe((r) => {});
    this.angularExampleService
      .deleteCookies()
      .subscribe((r) => {});
    this.storage.setLoggedIn(false);
    this.isLoggedIn = false;
  }
}
