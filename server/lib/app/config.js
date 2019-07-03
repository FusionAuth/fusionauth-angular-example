/**
 * Config Module
 *
 * The application's config for the different environments is here. We choose which information
 * to export to the application based on the environment chosen.
 *
 */

// Create the config module.
const config = {};

// Staging (default) environment
config.staging = {
    envName: "staging",
    httpPort: 3000,
    httpsPort: 3001,
    fusionAuth: {
        apiKey: "ndRtGYERFHgcHhBqbjfMPuESRY7X_6vZ6fWm4WazUv0",
        clientID: "bf499692-4847-440d-b46f-c264113890ea",
        clientSecret: "IUwnJ04HnV12zCxyak3gnKXJTNyoFk4YpLdmc4SXuFs",
        callbackURL: "http://localhost:3000/oauth2/callback",
        host: "http://localhost",
        port: "9011"
    },
    frontend: {
        baseURL: "http://localhost:4200"
    }
};

// Production environment
config.production = {
    envName: "production",
    httpPort: 5000,
    httpsPort: 5001,
    fusionAuth: {
        apiKey: "ndRtGYERFHgcHhBqbjfMPuESRY7X_6vZ6fWm4WazUv0",
        clientID: "bf499692-4847-440d-b46f-c264113890ea",
        clientSecret: "IUwnJ04HnV12zCxyak3gnKXJTNyoFk4YpLdmc4SXuFs",
        callbackURL: "http://localhost:3000/oauth2/callback",
        host: "http://localhost",
        port: "9011"
    },
    frontend: {
        baseURL: "http://localhost:4200"
    }
};

// Determine which environment was passed as a command-line argument
const currentEnv = (typeof process.env.NODE_ENV === "string") ? process.env.NODE_ENV.toLowerCase() : "";

// Check that the current environment is one of the environments above. If not, default to staging.
const configToExport = config[currentEnv] || config.staging;

// Export the config module.
module.exports = configToExport;