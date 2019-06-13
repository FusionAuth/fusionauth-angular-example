const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const passport = require('passport');

const exampleApi = require('./routes/example-api');
const registerUser = require('./routes/register-user');
const fusionAuth = require('./routes/fusionauth');
const oauth2 = require('./routes/oauth2');

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    exposedHeaders:
      'Access-Control-Allow-Origin,Access-Control-Allow-Credentials'
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.post('/api/user/registration', registerUser.registerUser);
app.delete('/api/fusionauth/cookies', fusionAuth.deleteCookies);
app.post('/api/fusionauth/cookies', fusionAuth.setCookies);
app.get('/api/example', exampleApi.example);

app.get('/oauth2/authorize', oauth2.authorize);
app.get('/oauth2/callback', oauth2.callback);
app.get('/oauth2/logout', oauth2.logout);

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
