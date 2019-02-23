import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PasswordComponent } from '../../components/password/password.component';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { StorageService } from '../../shared/storage/storage.service';


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
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    // TODO: This is a hack!  We are storing email so Two Factor + Change Password will complete
    // Eventually will get a OTP back and be able to remove this:
    localStorage.setItem('fusionauth.loginId', this.mainForm.value.loginId);
    // TODO: END
    const body = (response as HttpResponse<any>).body;
    switch (response.status) {
      case 200:
        this.storage.setAccessToken(body.token);
        this.router.navigate(['']);
        break;
      case 203:
        this.router.navigate(['/password/change', body.changePasswordId, { showChangeRequiredMsg: true }]);
        break;
      case 242:
        this.router.navigate(['/login/two-factor', body.twoFactorId ]);
        break;
      default:
       this.showInvalidMsg = true;
    }
  }
}
