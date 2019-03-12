import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TwoFactorComponent } from './pages/two-factor/two-factor.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PasswordComponent } from './components/password/password.component';
import { PasswordSentComponent } from './pages/password-sent/password-sent.component';
import { VerifyEmailSentComponent } from './pages/verify-email-sent/verify-email-sent.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ExampleComponent } from './pages/example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TwoFactorComponent,
    ErrorMessageComponent,
    PasswordComponent,
    PasswordSentComponent,
    VerifyEmailSentComponent,
    VerifyEmailComponent,
    ExampleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
