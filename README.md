# FusionauthAngularExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Email templates

Log in to FusionAuth and edit each of the email templates (verification, setup, and forgot) and change `localhost:9011` to `localhost:4200`.  In the Setup Password template you can also change `/password/change` to `/password/setup`.  In this example app that will give you some additional info that you are seting up you password for the first time.


## Change / Reset password
  Error cases:
  in by identity enter a invalid user or a valid user and incorrect current password to get a 404
  use an invalid token get a 404
  enter an invalid (e.g. 'pass' which is too short) password to get a 400

## Forgot password
  Before enabling sending emails you can see error 403 by trying with a valid email
  With a invalid username or email you will see 404
  In fusionauth setup a user with name 'noemail' and no email.  Then try with that name to get 422

