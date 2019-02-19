# FusionAuth Angular Example

This project contains an example project that illustrates using FusionAuth with Angular.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.


## Prerequisites
You will need the following things properly installed on your computer.

* [Angular](http://angular.io/)
* [FusionAuth](http://fusionauth.io/)
* [Git](http://git-scm.com/)


## Installation
* `git clone https://github.com/fusionauth/fusionauth-angular-example`
* `cd fusionauth-angular-example`
* `ng serve`

Also, all the usual angular commands should be error free:
* `ng test`
* `ng lint`
* `ng build`

However at this point `ng e2e` tests have not been implemented.

## The Example App
There are two sections...


## Setting up FusionAuth
There are various user flows that you might want to configure.
* Email - If you have an SMTP server you can enable email which will allow users to follow the forgot password and email varification steps.
* Email Verification - In FusionAuth

## Email templates
Log in to FusionAuth and edit each of the email templates (verification, setup, and forgot) and change `localhost:9011` to `localhost:4200`.  In the Setup Password template you can also change `/password/change` to `/password/setup`.  In this example app that will give you some additional info that you are seting up your password for the first time.


## Change / Reset password
Error cases:
in by identity enter a invalid user or a valid user and incorrect current password to get a 404
use an invalid token get a 404
<!-- enter an invalid (e.g. 'pass' which is too short) password to get a 400 is no longer possible with email validations -->


## Forgot password
* Before enabling sending emails in FusionAuth you can see error 403 (sending email not enabled) by trying with a valid email
* With an invalid username or email you will see 404.
* In fusionauth setup a user with name 'noemail' and no email.  Then try with that name to get 422

<!-- ## Email verification after registration/sign-up -->
<!-- Enable verify on system level, then check email is verified.  If you want to enforce email verification you can set env flag requireEmailVerification. -->

# Tips, Tricks, and Hacks

## Autopopulate fields for testing
If you get tired of typing in emails and passwords you can hard code in the `FormControl` values that you know will work.  For example,
```
this.mainForm = new FormGroup({
  ...
  password: new FormControl('password', PasswordComponent.validators),
  loginId: new FormControl('email@domain.com', [ Validators.required ])
  ...
});
```
Also, on during the various scenarios where you are sending emails (e.g. registration) and you are using gmail (e.g. valid_email@gmail.com) you can create a user with a valid email like so:
```
email: new FormControl('valid_email+t' + Date.now() + '@gmail.com', ...)
```
