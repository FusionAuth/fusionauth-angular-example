const bodyParser = require("body-parser");
const config = require('./config/config.json');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');


const changePassword = require('./routes/change-password');
const registerUser = require('./routes/register-user');
const fusionAuth = require('./routes/fusionauth');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  exposedHeaders: 'Access-Control-Allow-Origin,Access-Control-Allow-Credentials'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user/registration', registerUser.registerUser);
app.post('/api/user/change-password', changePassword.changePassword);
app.post('/api/fusionauth/cookies', fusionAuth.setCookies);
app.delete('/api/fusionauth/cookies', fusionAuth.deleteCookies);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
