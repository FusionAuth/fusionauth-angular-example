const config = require ('../config/config.json');
const http = require('http');

const sendRegisterRequest = (incomingRequest, outgoingResponse) => {
  const body = incomingRequest.body;
  const options = {
    host: config.host,
    port: config.port,
    path: '/api/user/registration',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.apiKey
    }
  };
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
      outgoingResponse.status(fusionauthResponse.statusCode).send(responseString);
    });
  });
  fusionauthRequest.write(filteredBody);
  fusionauthRequest.end();
}

module.exports = {
  registerUser: sendRegisterRequest
}
