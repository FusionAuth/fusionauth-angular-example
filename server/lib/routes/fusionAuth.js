/**
 * FusionAuth Module
 *
 * This is the pseudo auth handler for the frontend that allows the user to be
 * logged in and stayed logged in by setting or removing cookies when the user
 * logs in or logs out, respectively.
 *
 */

// Dependencies
const express = require("express");
const router = express.Router();

/**
 * Allow the user to login.
 *
 * This function allows the user to login by setting an HTTP cookie.
 *
 */
router.post("/login", (req, res) => {
  // Cookie settings
  const cookieSettings = { httpOnly: true };
  // Set the user cookie.
  res.cookie("accessToken", req.body.token, cookieSettings);
  res.send();
});

/**
 * Allow the user to logout.
 *
 * This function allows the user to logout by removing their login cookie.
 *
 */
router.delete("/logout", (req, res) => {
  // Cookie settings
  const cookieSettings = { httpOnly: true, maxAge: 0 };
  // Remove the user cookie.
  res.cookie("accessToken", "", cookieSettings);
  res.send();
});

// Export the FusionAuth module.
module.exports = router;
