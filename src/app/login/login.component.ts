import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { PasswordComponent } from '../password/password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  mainForm: FormGroup;
  showInvalidMsg: boolean;
  showPasswordChangeMsg: boolean;
  showRegistrationMsg: boolean;

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
    this.showInvalidMsg = false;
  }

  ngOnInit() {
    this.showRegistrationMsg = this.route.snapshot.paramMap.get('showRegistrationMsg') === 'true';
    this.showPasswordChangeMsg = this.route.snapshot.paramMap.get('showPasswordChangeMsg') === 'true';
    this.mainForm = new FormGroup({
      password: new FormControl('', PasswordComponent.validators),
      loginId: new FormControl('', [ Validators.required ])
    });
    // TODO: Remove this before release
    this.mainForm.get('loginId').setValue('angular@fusionauth.io');
    this.mainForm.get('password').setValue('angulario');
    //
    this.mainForm.get('loginId').setValue('test8@testerson.com');
    this.mainForm.get('password').setValue('password');
  }

  submit() {
    this.showInvalidMsg = false;
    if (this.mainForm.valid) {
      this.fusionAuthService
        .login(this.mainForm.value)
        .subscribe((e) => this.handleResponse(e), (r) => this.handleResponse(r));
    }
  }

  handleResponse(response: HttpErrorResponse | HttpResponse<any>) {
    switch (response.status) {
      case 200:
        this.router.navigate(['']);
        break;
      case 203:
        // TODO: Create a route and update change password to respond to different routes
        this.router.navigate(['/password/change', response.body.changePasswordId], { showChangeRequiredMsg: true });
        break;
      case 242:
        this.router.navigate(['/login/two-factor', response.body.twoFactorId ]);
        break;
      default:
       this.showInvalidMsg = true;
    }
  }
}
