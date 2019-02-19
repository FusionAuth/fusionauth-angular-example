import { ErrorStateMatcher } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


export const passwordValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.controls['password'].value;
  const confirmPassword = group.controls['confirmPassword'].value;

  return password && confirmPassword && password === confirmPassword ? null : { 'passwordMismatch': true };
};

export class PasswordErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
