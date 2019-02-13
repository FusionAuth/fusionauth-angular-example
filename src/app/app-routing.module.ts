import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordSentComponent } from './password-sent/password-sent.component';
import { RegisterComponent } from './register/register.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/two-factor/:id', component: TwoFactorComponent },
  { path: 'password/change', component: ChangePasswordComponent },
  { path: 'password/change/:id', component: ChangePasswordComponent },
  { path: 'password/forgot', component: ForgotPasswordComponent },
  { path: 'password/sent', component: PasswordSentComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
