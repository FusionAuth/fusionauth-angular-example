const config = require ('../config/config.json');
const http = require('http');

const verifyAccessToken = (incomingRequest, outgoingResponse) => {
  const body = incomingRequest.body;
  const options = {
    host: config.host,
    port: config.port,
    path: '/api/jwt/validate',
    headers: {
      Authorization: 'JWT ' + incomingRequest.cookies.accessToken
    }
  };
  const verifyRequest = http.get(options, (verifyResponse) => {
    var responseString = '';
    verifyResponse.on('data', function (data) {
      responseString += data;
    });
    verifyResponse.on('end', function () {
      if (verifyResponse.statusCode === 200) {
        const data = JSON.parse(responseString);
        body.loginId = data.jwt.email;
        callFusionAuthChangePassword(incomingRequest, outgoingResponse);
      } else {
        outgoingResponse.status(verifyResponse.statusCode).send(responseString);
      }
    });
  });
  verifyRequest.end();
}

const callFusionAuthChangePassword = (incomingRequest, outgoingResponse) => {
  const body = incomingRequest.body;
  const options = {
    host: config.host,
    port: config.port,
    path: '/api/user/change-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + incomingRequest.cookies.accessToken
    }
  };
  const filteredBody = JSON.stringify({
    currentPassword: body.currentPassword,
    loginId: body.loginId,
    password: body.password
  });
  const fusionAuthRequest = http.request(options, (fusionAuthResponse) => {
    var responseString = '';
    fusionAuthResponse.on('data', function (data) {
      responseString += data;
    });
    fusionAuthResponse.on('end', function () {
      outgoingResponse.status(fusionAuthResponse.statusCode).send(responseString);
    });
  });
  fusionAuthRequest.write(filteredBody);
  fusionAuthRequest.end();
}

module.exports = {
  changePassword: callFusionAuthChangePassword
}
