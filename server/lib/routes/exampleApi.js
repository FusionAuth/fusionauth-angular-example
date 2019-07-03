/**
 * Example API
 *
 * This is an example of a request to one of the FusionAuth endpoints. The request
 * here attempts to validate a JWT token and returns whether or not the JWT is valid.
 */

// Dependencies
const axios = require("axios");
const express = require("express");
const router = express.Router();

// Config
const config = require ('../app/config');

/**
 * Validate JWT
 *
 * This function validates the user's JWT that is stored in an HTTP cookie and returns
 * whether or not the JWT is valid.
 *
 */
router.get("/", (req, res) => {
  // Make the request to the FusionAuth server.
  axios({
    baseURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
    url: "/api/jwt/validate",
    method: "get",
    headers: {
      Authorization: `JWT ${ req.cookies.accessToken }`
    }
  }).then(response => {
    // Let the user know their JWT is valid.
      res.send({ message: "Success!"});
  }).catch(err => {
    // Let the user know that their JWT is invalid and they must re-login.
    res.status(401).send(err);
  });
});

// Export the Example API module.
module.exports = router;
