/**
 * User Module
 *
 * This module contains functions for the /user endpoints. In this application, only
 * the user registration is set up.
 */

// Dependencies
const axios = require("axios");
const express = require("express");
const router = express.Router();

// Config
const config = require('../app/config');

/**
 * User Registration
 *
 * This endpoints allows the user to register to the application. It gathers the
 * user's input from the request and uses Axios to make a request to the FusionAuth server.
 *
 */
router.post("/registration", (req, res) => {
  // Object for the FusionAuth user registration endpoint with the submitted data.
  const filteredBody = JSON.stringify({
    registration: {
      applicationId: body.registration.applicationId
    },
    user: {
      email: body.user.email,
      firstName: body.user.firstName,
      lastName: body.user.lastName,
      password: body.user.password
    }
  });

  // Axios request to the FusionAuth server.
  axios({
    baseURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
    url: "/api/user/registration",
    method: "post",
    data: filteredBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: config.fusionAuth.apiKey
    }
  }).then(response => {
    // Send the status of the response, because different statuses require different user
    // experiences. Send the data of the response as well.
    res.status(response.status).send(response.data);
  }).catch(err => {
    // Send a 500 error to let the user know something went wrong.
    res.status(500).send(err);
  });
});

// Export the User module.
module.exports = router;
