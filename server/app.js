/**
 * Entry point for the API
 *
 * This file brings in the express server and starts it when the app is initialized.
 * With this setup, you can also start background processes when the app starts.
 *
 */

// Dependencies
const server = require("./lib/app/server");

// Declare the application module.
const app = {};

/**
 * The application is initialized in this function. In this case, the application starts the express server.
 *
 */
app.init = () => {
    // Start the express server.
    server.init();
}

// Start the application.
app.init();