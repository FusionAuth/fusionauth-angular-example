# FusionAuth Angular Example Tests

## Login, Change Password, Logout

### Invalid username or password
* Enter anything invalid

### Succes, Change Password, Logout
* Login with valid email and password a user without two factor enabled
* Change password
* Logout


## Forgot password

### With valid token
* Login
* Click on Forgot Password
* Redirect to email sent
* Check email and click on link
* Reset password
* Redirect to login

### With invalid token
* Use a fake token
* Enter passwords


## Two Factor Auth

###  Login with two factor and trust computer
* Login
* Enter two factor code and click trust computer
* Logout
* Login
* Return immediately to the home page
> Note this is not yet working, but will when trust is set in cookies

### Invalid or expired
* Use a fake token
* Enter any code

### Invalid code
* Login to get a valid token
* Enter an invalid code


## Change password required

### With valid token, without two factor
* Set user must change password in fusionauth
* Login
* Change password
* Redirect to home page

### With valid token, with two factor
* Set user must change password in fusionauth
* Login
* Two factor
* Change password
* (should be able to login behind the scenes, but )
* Redirect to home page
> This has not been tested


### With invalid token
* Use a fake token
* Enter passwords


## Sign Up

### Without verification
* Turn off verification in FusionAuth
* Sign up a new user
* Redirect to Login page with registration success message

### With verification
* Turn on verification in FusionAuth
* Sign up a new user
* Redirect to email sent
* Check email and click on link
* Redirect to login with email verified message

### Email verification with invalid token
* Use any invalid token
