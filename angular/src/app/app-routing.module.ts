import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordSentComponent } from './password-sent/password-sent.component';
import { RegisterComponent } from './register/register.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailSentComponent } from './verify-email-sent/verify-email-sent.component';

const routes: Routes = [
  { path: 'email/verify/:id', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/two-factor/:id', component: TwoFactorComponent },
  { path: 'password/change', component: ChangePasswordComponent },
  { path: 'password/change/:id', component: ChangePasswordComponent },
  { path: 'password/forgot', component: ForgotPasswordComponent },
  //TODO: password setup?
  { path: 'password/sent', component: PasswordSentComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'verify/sent', component: VerifyEmailSentComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
