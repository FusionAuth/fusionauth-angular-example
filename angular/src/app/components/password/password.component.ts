import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { PasswordMatchErrorMatcher } from '../password/password-match.validator';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent {
  static validators = [ Validators.required, Validators.minLength(8), Validators.maxLength(256) ];

  @Input() autocomplete: string;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;
  @Input() placeholder: string;
  errorMatcher: PasswordMatchErrorMatcher;
  showPassword: boolean;

  constructor() {
    this.showPassword = false;
    this.errorMatcher = new PasswordMatchErrorMatcher();
  }
}
