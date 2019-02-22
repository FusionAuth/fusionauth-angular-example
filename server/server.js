const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const http = require('http');
const config = require('./config/config.json');
const changePassword = require('./routes/change-password');

const app = express();
const port = 3000;
const options = {
  host: config.host,
  port: config.port,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': config.apiKey
  }
};

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/user/registration', (angularRequest, angularResponse) => {
  options.path = '/api/user/registration';
  const body = angularRequest.body;
  const filteredBody = JSON.stringify({
    registration: {
      applicationId: body.registration.applicationId
    },
    user: {
      email: body.user.email,
      firstName: body.user.firstName,
      lastName: body.user.lastName,
      password: body.user.password
    }
  });
  const fusionauthRequest = http.request(options, (fusionauthResponse) => {
    var responseString = '';
    fusionauthResponse.on('data', function (data) {
      responseString += data;
    });
    fusionauthResponse.on('end', function () {
      angularResponse.status(fusionauthResponse.statusCode).send(responseString);
    });
  });
  fusionauthRequest.write(filteredBody);
  fusionauthRequest.end();
});

app.post('/api/user/change-password', changePassword.changePassword());

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
