import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showPassword = false;
  showInvalidMsg = false;
  showRegistrationMsg = false;

  mainForm = new FormGroup({
    password: new FormControl('', [ Validators.required ]),
    loginId: new FormControl('', [ Validators.required ])
  });

  constructor(private route: ActivatedRoute, private fusionAuthService: FusionAuthService, private router: Router) {
    //TODO: Remove this before release
    this.mainForm.get('loginId').setValue('angular@fusionauth.io');
    this.mainForm.get('password').setValue('angulario');
  }

  ngOnInit() {
    this.showRegistrationMsg = this.route.snapshot.paramMap.get('showRegistrationMsg') === 'true';
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
    if (response.status === 203) {
      //TODO: Create a route and update change password to respond to different routes
      this.router.navigate(['/password/change-required', response.body.changePasswordId]);
    } else if (response.status === 242) {
      this.router.navigate(['/login/two-factor', response.body.twoFactorId ]);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
