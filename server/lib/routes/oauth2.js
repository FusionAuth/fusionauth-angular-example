/**
 * OAuth 2 Module
 *
 * This module uses the newer OAuth 2 method for logging in users.
 *
 */

// Dependencies
const axios = require("axios");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// Config
const config = require('../app/config');

/**
 * Passport Authentication
 *
 * This function uses passport to enable the user to login with OAuth 2 as it makes a
 * request to the FusionAuth server.
 *
 */
passport.use(
  "fusionauth",
  new OAuth2Strategy(
    {
      authorizationURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }/api/oauth2/authorize`,
      tokenURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }/api/oauth2/token`,
      clientID: config.fusionAuth.clientID,
      clientSecret: config.fusionAuth.clientSecret,
      callbackURL: config.fusionAuth.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // Verify accessToken was provided.
      if (!accessToken) {
        done(null, false);
      }

      // Verify token and get user info
      axios({
        baseURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
        url: "/oauth2/userinfo",
        method: "get",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        const user = {
          ...response.data,
          accessToken
        }

        // TODO: Persist user
        done(null, user);
      }).catch(err => {
        done(null, false);
      });
    }
  )
);

/**
 * Authorize users
 *
 * Users make a request to this endpoint to become authenticated within the frontend.
 *
 */
router.get("/authorize", (req, res) => {
  passport.authenticate("fusionauth", {
    session: false
  });
});

/**
 * User login
 *
 * Check if users can login, and set their HTTP cookie if so. Otherwise, make them log in.
 *
 */
router.get("/callback", (req, res, next) => {
  passport.authenticate("fusionauth", (err, user) => {
    // If there is an error, skip the rest of the authentication flow.
    if (err) {
      return next(err);
    }

    // If the user does not exist, make them log in.
    if (!user) {
      return res.redirect(`${ config.frontend.baseURL }/login`);
    }

    // Set a cookie with the user's access token so they can stay logged in.
    res.cookie("accessToken", user.accessToken, { httpOnly: true });
    // Redirect the user to the application.
    res.redirect(config.frontend.baseURL);
  })(req, res, next);
});

/**
 * User logout
 *
 * Users visit the endpoint to become logged out via OAuth 2.
 *
 */
router.get("/logout", (req, res) => {
  // Logout the user.
  req.logout();
  // Redirect the user.
    res.redirect(config.frontend.baseURL);
});

// Export the OAuth 2 module.
module.exports = router;
