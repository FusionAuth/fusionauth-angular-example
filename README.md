# FusionAuth Angular Example

This project contains an example project that illustrates using FusionAuth with Angular.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.


## Prerequisites
You will need the following things properly installed on your computer.

* [Angular](http://angular.io/)
* [FusionAuth](http://fusionauth.io/)
* [Git](http://git-scm.com/)


## Installation and Setup
For this example there will be three `localhost` servers running:
* `localhost:9011` -- FusionAuth
* `localhost:3000` -- A lightweight node server that handles requests that require an API key
* `localhost:4200` -- The Angular example app

```
git clone https://github.com/fusionauth/fusionauth-angular-example
cd fusionauth-angular-example/angular
npm install
ng serve
cd ../server
npm install
node server.js
```


## Setting up FusionAuth
Log into FusionAuth and create a new API key using the value from the `server/config/config.json`.  Then create a new application using the value from `angular/src/environments/environments.ts`.

### Email templates
Log in to FusionAuth and edit each of the email templates (Email Verification, Setup Password, and Forgot Password) and change `localhost:9011` to `localhost:4200`.  In the Setup Password template you can also change `/password/change` to `/password/setup`.  In this example app that will give you some additional info when you click on the link that you are seting up your password for the first time.


## The Example App
There are a few FusionAuth configuration options that will effect the user workflows.  They are listed below as well as highlighted in the flow charts.

- With email turned off both the Forgot Password and Email Verification workflows will not be enabled.
- If Email Verification is turned off the user's email will automatically be marked as valid and the Sign Up workflow will go straight to the login page.
- If two factor authentication is enabled for a user then there will be an additional step during login.

### Workflows
The flow charts below reflect an error free workflow with various conditionals.  Below each workflow any error messages that can appear are described.

#### Log In/Out
![](images/FusionAuth%20Angular%20Example-Log%20in-Log%20out.png)
On the Login page:
* Error 404: The user was not found or the password was incorrect.
On the Two Factor Authorization page:
* Error 404: The token has expired and the user will need to login again.
* Error 421: The authorization code was incorrect.

#### Forgot password
![](images/FusionAuth%20Angular%20Example-Forgot%20Password.png)
On the Forgot Password page:
* Error 403: The forgot password functionality has been disabled.  With email disabled in FusionAuth entering a valid email in the form will cause this error.
* Error 404: Invalid username or email.
* Error 422: The user does not have an email address.  Log in to FusionAuth and create a user with a username, but no email.
For the Reset Password page see [Change Password] errors.

#### Sign Up
![](images/FusionAuth%20Angular%20Example-Sign%20Up.png)
> *Note that in the Angular example the only way to get to the Email Verified page is to complete the workflow using a valid token that you recieve in email.*

On the Sign Up page:
* Error 400: A user with that username or email already exists
On the Resend Verification Email page:
* Error 404: The token is invalid and the user will need to resend the verification email.

#### Change Password

<!-- #### Change / Reset password -->
<!-- Error cases: -->
<!-- in by identity enter a invalid user or a valid user and incorrect current password to get a 404 -->
<!-- use an invalid token get a 404 -->
<!-- enter an invalid (e.g. 'pass' which is too short) password to get a 400 is no longer possible with email validations -->


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
