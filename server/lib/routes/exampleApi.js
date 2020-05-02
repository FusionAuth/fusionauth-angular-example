/**
 * Example API
 *
 * This is an example of a request to one of the FusionAuth endpoints. The request
 * here attempts to validate a JWT token and returns whether or not the JWT is valid.
 */

// Dependencies
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Config
const config = require("../app/config");

/**
 * Grab user data
 *
 * Fetch all of the information about a user utilizing their valid JWT and
 * return the JSON stringified result to them.
 *
 */
router.get("/", (req, res) => {
    // Make the request to the FusionAuth server.
    axios({
        baseURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
        url: "/api/user",
        method: "get",
        headers: {
            Authorization: `JWT ${ req.cookies.accessToken }`
        }
    }).then(response => {
        // Send the user the stringified JSON object that is their profile.
        res.send({ message: JSON.stringify(response.data.user) });
    }).catch(err => {
        // Let the user know that we could not grab their info.
        res.status(500).send({ message: "Unable to grab your info." });
    });
});

// Export the Example API module.
module.exports = router;
