import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PasswordComponent } from '../password/password.component';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { StorageService } from '../storage/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  mainForm: FormGroup;
  showInvalidMsg: boolean;
  showPasswordChangeMsg: boolean;
  showRegistrationMsg: boolean;

  constructor(
    private fusionAuthService: FusionAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService
  ) {
    this.showInvalidMsg = false;
  }

  ngOnInit() {
    this.showRegistrationMsg = this.route.snapshot.paramMap.get('showRegistrationMsg') === 'true';
    this.showPasswordChangeMsg = this.route.snapshot.paramMap.get('showPasswordChangeMsg') === 'true';
    const deviceId = this.storage.getDeviceId();
    this.mainForm = new FormGroup({
      device: new FormControl(deviceId),
      password: new FormControl('', PasswordComponent.validators),
      loginId: new FormControl('', [ Validators.required ])
    });
  }

  submit() {
    this.showInvalidMsg = false;
    if (this.mainForm.valid) {
      this.fusionAuthService
        .login(this.mainForm.value)
        .subscribe((e) => this.handleSuccess(e), (r) => this.handleFailure(r));
    }
  }

  handleFailure(error: HttpErrorResponse) {
    this.showInvalidMsg = true;
  }

  handleSuccess(response: HttpResponse<any>) {
    switch (response.status) {
      case 200:
        this.storage.setRefreshToken(response.body.refreshToken);
        this.storage.setAccessToken(response.body.token);
        this.router.navigate(['']);
        break;
      case 203:
        this.router.navigate(['/password/change', response.body.changePasswordId, { showChangeRequiredMsg: true }]);
        break;
      case 242:
        this.router.navigate(['/login/two-factor', response.body.twoFactorId ]);
        break;
      default:
       this.showInvalidMsg = true;
    }
  }
}
