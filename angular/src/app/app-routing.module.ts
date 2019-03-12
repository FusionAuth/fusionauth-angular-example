import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordSentComponent } from './pages/password-sent/password-sent.component';
import { RegisterComponent } from './pages/register/register.component';
import { TwoFactorComponent } from './pages/two-factor/two-factor.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifyEmailSentComponent } from './pages/verify-email-sent/verify-email-sent.component';
import { ExampleComponent } from './pages/example/example.component';


const routes: Routes = [
  { path: 'email/verify/:id', component: VerifyEmailComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/two-factor/:id', component: TwoFactorComponent },
  { path: 'password/change', component: ChangePasswordComponent },
  { path: 'password/change/:id', component: ChangePasswordComponent },
  { path: 'password/change-required/:id', component: ChangePasswordComponent },
  { path: 'password/forgot', component: ForgotPasswordComponent },
  { path: 'password/setup/:id', component: ChangePasswordComponent },
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
