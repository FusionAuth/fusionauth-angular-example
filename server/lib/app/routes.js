/**
 * Routes Module
 *
 * The route module handles all incoming requests to the server and routes appropriately
 * to the correct route functions.
 *
 */

// Dependencies
const jwt = require("../util/jwt");

// Route info
const oauth2 = require('../routes/oauth2');
const fusionAuth = require('../routes/fusionAuth');
const user = require('../routes/user');
const exampleApi = require('../routes/exampleApi');

// Declare the module.
const routes = app => {
    app.use("/api/fusionauth", fusionAuth);
    app.use(jwt.validate);
    app.use("/api/oauth2", oauth2);
    app.use("/api/example", exampleApi);
    app.use("/api/user", user);
}

// Export the routes module.
module.exports = routes;