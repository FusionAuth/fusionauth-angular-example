import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { StorageService } from '../../shared/storage/storage.service';


@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html'
})
export class TwoFactorComponent implements OnInit {
  showExpiredMsg: boolean;
  showInvalidCodeMsg: boolean;
  twoFactorId: string;
  mainForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fusionAuthService: FusionAuthService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {
    const twoFactorId = this.route.snapshot.paramMap.get('id');
    const deviceId = this.storage.getDeviceId();
    this.mainForm = new FormGroup({
      device: new FormControl(deviceId),
      code: new FormControl('', [ Validators.required ]),
      trustComputer: new FormControl(''),
      twoFactorId: new FormControl(twoFactorId)
    });
  }

  submit() {
    if (this.mainForm.valid) {
      this.fusionAuthService
        .twoFactorLogin(this.mainForm.value)
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        const body = (response as HttpResponse<any>).body;
        this.storage.setAccessToken(body.token);
        this.router.navigate(['']);
        break;
      case 404:
        this.showExpiredMsg = true;
        break;
      case 421:
        this.showInvalidCodeMsg = true;
    }
  }
}
