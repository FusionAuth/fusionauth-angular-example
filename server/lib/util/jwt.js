/**
 * JWT Module
 *
 * This module contains functions related to JWT usage. It allows for validating
 * a user's JWT to ensure that they are logged in, and thus, can access the API
 * endpoints for the frontend.
 *
 */

// Dependencies
const axios = require("axios");

// Config
const config = require("../app/config");

// Create the JWT module.
const jwt = {};

/**
 * Validate a JWT
 *
 * This function is a piece of middleware that will validate a user's JWT
 * before allowing them access to any API endpoint, beside the ability to log
 * into the frontend, or to logout.
 *
 */
jwt.validate = (req, res, next) => {
    // Make the request to the FusionAuth server.
    axios({
        baseURL: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
        url: "/api/jwt/validate",
        method: "get",
        headers: {
            Authorization: `JWT ${ req.cookies.accessToken }`
        }
    }).then(response => {
        // User has a valid JWT, so continue to the API.
        next();
    }).catch(err => {
        // Let the user know that their JWT is invalid and they must re-login.
        res.status(401).send({ message: "Unauthorized Access" });
    });
};

// Export the JWT module.
module.exports = jwt;