# (ARCHIVED) FusionAuth Angular Example

**NOTE**": This project is no longer the correct example for Angular integration with FusionAuth. Please refer to the new https://github.com/FusionAuth/fusionauth-example-angular repository for the correct implementation of the OAuth Authorization Code Grant with FusionAuth.



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
Log in to FusionAuth and edit each of the email templates (Email Verification, Setup Password, and Forgot Password) and change `localhost:9011` to `localhost:4200`.  In the Setup Password template you can also change `/password/change` to `/password/setup`.  In this example app that will give you some additional info when you click on the link that you are setting up your password for the first time.


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

On the Change Password page:
* Error 404: The token has expired and the user will need to login again.

#### Forgot password
![](images/FusionAuth%20Angular%20Example-Forgot%20Password.png)

On the Forgot Password page:
* Error 403: The forgot password functionality has been disabled.  With email disabled in FusionAuth entering a valid email in the form will cause this error.
* Error 404: Invalid username or email.
* Error 422: The user does not have an email address.  Log in to FusionAuth and create a user with a username, but no email.

For the Reset Password page:
* Error 404: The token has expired and the user will need to resend the Forgot Password email.

#### Sign Up
![](images/FusionAuth%20Angular%20Example-Sign%20Up.png)

> *Note that in the Angular example the only way to get to the Email Verified page is to complete the workflow using a valid token that you receive in email.*

On the Sign Up page:
* Error 400: A user with that username or email already exists

On the Resend Verification Email page:
* Error 404: The token is invalid and the user will need to resend the verification email.

#### Change Password
> *Image coming soon.*

On the change password page:
* Error 401: The access token has expired.  If the attempt to refresh the access token fails (because the refresh token has also expired) then the user will be directed to login again.
* Error 404: Invalid current password.


## Token Refresh Example

This example shows how on the backend node server a request, in this case to `/api/example` can be wrapped by a function (`verifyToken`) that will first verify the `accessToken` is valid before calling a callback function to complete the action.  If expired the frontend application will then try to refresh the token and if successful retry the initial request.  If the `refresh_token` has expired the user is logged out and directed to login again.

Below are some steps that will allow you to see this in action, but first let's discuss what how and where these tokens are set.  There are two HTTP only cookies (`access_token` and `refresh_token`) set by fusionauth when you log in and are thus domain locked to `localhost:4200`.  Any communication to the node server will not have access to these so it is necessary to make a call to `/api/fusionauth/cookies` which will set a third HTTP only cookie `accessToken` for use in verifying user requests.  This cookie will be domain locked to `localhost:3000`.  It is recommended that these not be stored anywhere on the frontend (e.g. `localStorage`) that other javascript libraries might also have access to it.

To see the token workflow in action:

* Log in to FusionAuth and reduce the `Refresh Token` time down to 1 minutes and the `Access Token` time down to 10 seconds
* Log in to the Angular example app
* Click on the `Token refresh example`
* You will see a success message without the need to refresh the access tokens
* Wait longer than 10 seconds and then refresh the page
* You will see messages describing refreshing the access token and then a success message
* Wait another 50 seconds giving the refresh token time to expire and then refresh the page
* You will see messages describing refreshing the access token and then a message that the refresh token has expired


## Adding username to the Sign Up page
You will need to add `username` several places:

* In `server/routes/register-user.js` add `username` the `user` object:
```
  user: {
    ...
    username: body.user.username
  }
```

* In `angular/src/app/pages/register/register.component.ts` add a new `FormControl`:
```
  new FormGroup({
    ...
    username: new FormControl('', [ Validators.required ])
  });
```

* In `angular/src/app/pages/register/register.component.html` there is already a form field for username that is commented out.  Remove the surrounding `<!-- -->`.


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
Also, during the various scenarios where you are sending emails (e.g. registration) and you are using gmail (e.g. valid_email@gmail.com) you can create a user with a valid email:
```
email: new FormControl('valid_email+t' + Date.now() + '@gmail.com', ...)
```
Now any email verification or forgot password emails will still arrive since gmail will ignore the `+` and anything after.
