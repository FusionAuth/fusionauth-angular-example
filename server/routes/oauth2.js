const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const http = require('http');
const config = require('../config/config.json');

passport.use(
  'fusionauth',
  new OAuth2Strategy(
    {
      authorizationURL: `${config.host}:${config.port}/oauth2/authorize`,
      tokenURL: `${config.host}:${config.port}/oauth2/token`,
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      // verify accessToken was provided
      if (!accessToken) {
        done(null, false);
      }

      // verify token and get user info
      const options = {
        host: config.host,
        port: config.port,
        path: '/oauth2/userinfo',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
      const userInfoRequest = http.get(options, res => {
        var chunks = '';
        res.on('data', data => {
          chunks += data;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            const result = JSON.parse(chunks);
            const user = {
              ...result,
              accessToken
            };

            // todo: persist user

            done(null, user);
          } else {
            done(null, false);
          }
        });
      });
      userInfoRequest.end();
    }
  )
);

const callback = (req, res, next) => {
  passport.authenticate('fusionauth', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:4200/login');
    }
    console.log(user);
    res.cookie('accessToken', user.accessToken, { httpOnly: true });
    res.redirect('http://localhost:4200');
  })(req, res, next);
};

module.exports = {
  authorize: passport.authenticate('fusionauth', {
    session: false
  }),
  callback,
  logout: (req, res) => {
    req.logout();
    res.redirect('http://localhost:4200/');
  }
};
