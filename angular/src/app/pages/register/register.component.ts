import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { PasswordComponent } from '../../components/password/password.component';
import { passwordMatchValidator } from '../../components/password/password-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  mainForm: FormGroup;
  showErrorDuplicateEmail: boolean;

  constructor(private angularExampleService: AngularExampleService, private router: Router) {
    this.showErrorDuplicateEmail = false;
  }

  ngOnInit() {
    this.mainForm = new FormGroup({
      confirmPassword: new FormControl(''),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl('', PasswordComponent.validators)
    }, {
      validators: passwordMatchValidator
    });
  }

  submit() {
    this.resetErrorMessages();
    if (this.mainForm.valid) {
      const user = this.mainForm.value;
      this.angularExampleService
        .register(user)
        .subscribe((r) => this.handleResponse(r), (e) => this.handleResponse(e));
    }
  }

  private resetErrorMessages() {
    this.showErrorDuplicateEmail = false;
  }

  handleResponse(response: HttpResponse<any> | HttpErrorResponse) {
    switch (response.status) {
      case 200:
        if ((response as HttpResponse<any>).body.user.verified) {
          this.router.navigate(['/login', { showMessageRegistration: true }]);
        } else {
          this.router.navigate(['/verify/sent']);
        }
        break;
      case 400:
        this.showErrorDuplicateEmail = true;
        break;
    }
  }
}
