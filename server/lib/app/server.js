/**
 * Server Module
 *
 * This is the express server module which handles setting up middleware, starting
 * the HTTP / HTTPS server, and setting up the route listeners.
 *
 */

// Dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const passport = require('passport');

// Config
const config = require("./config");

// Create the express object
const app = express();

// Declare the server module
const server = {};

/**
 * Setup the middleware for the application.
 *
 * This will process the middleware for the application before we start listening for requests.
 * It will also return a promise so that we can wait for everything to be processed.
 *
 */
server.setMiddleware = () => {
    return new Promise(resolve => {
        // Setup the CORS policy
        app.use(
            cors({
                origin: `${ config.fusionAuth.host }:${ config.fusionAuth.port }`,
                credentials: true,
                exposedHeaders:
                    'Access-Control-Allow-Origin,Access-Control-Allow-Credentials'
            })
        );
        // Setup body parser to easily parse incoming data.
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        // Setup the ability to use cookies.
        app.use(cookieParser());
        // Initialize passport authentication.
        app.use(passport.initialize());
        resolve();
    });
}

/**
 * Start the HTTP server.
 *
 */
server.httpServer = () => {
    /**
     * Start the express server on the HTTP port for the chosen environment.
     *
     * Resolve the promise once the server is up and running, or reject if there is an error.
     */
    return new Promise((resolve, reject) => {
        app.listen(config.httpPort, err => {
            if (err) {
                // Reject and log the error.
                reject();
                return console.log(`Error: ${ err }`);
            }

            // Log the server start and resolve.
            console.log("\x1b[36m%s\x1b[0m", `Running a ${config.envName} environment on port ${config.httpPort}`);
            resolve();
        });
    });
}

/**
 * Start the HTTPS server.
 *
 */
server.httpsServer = () => {
    // TODO: Implement HTTPS server
    // This is where we would start the HTTPS server.
    return new Promise((resolve, reject) => resolve());
}

/**
 * Start the HTTP / HTTPS server.
 *
 * This will start both HTTP and HTTPS servers (if needed). Once the servers are running, then
 * the routes are included and passed the express object in order to listen for requests.
 *
 */
server.startListeners = async () => {
    // Start the HTTP / HTTPS servers and await their response.
    await server.httpServer()
        .catch(() => process.exit(1));
    await server.httpsServer()
        .catch(() => process.exit(2));


    // Import the routes and pass the application object to them.
    require("./routes")(app);
}

/**
 * Initialize the express server module.
 *
 * This will start the middleware for the server, which returns a promise. Once the middleware are set, then
 * the listeners will be setup. Finally, the routes will be passed the app object and be ready to listen for
 * requests.
 *
 */
server.init = () => {
    // Wait for the middleware to be processed before we start the HTTP / HTTPS listeners.
    server.setMiddleware()
        .then(() => server.startListeners());
}

// Export the module
module.exports = server;