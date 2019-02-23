const config = require ('../config/config.json');
const http = require('http');

const verifyAccessToken = (incomingRequest, outgoingResponse) => {
  const body = incomingRequest.body;
  const options = {
    host: config.host,
    port: config.port,
    path: '/api/jwt/validate',
    headers: {
      Authorization: 'JWT ' + body.accessToken
    }
  };
  const verifyRequest = http.get(options, (verifyResponse) => {
    var responseString = '';
    verifyResponse.on('data', function (data) {
      responseString += data;
    });
    verifyResponse.on('end', function () {
      console.log(verifyResponse.statusCode);
      if (verifyResponse.statusCode === 200) {
        const data = JSON.parse(responseString);
        body.loginId = data.jwt.email;
        callFusionAuthChangePassword(outgoingResponse, body);
      } else {
        outgoingResponse.status(verifyResponse.statusCode).send(responseString);
      }
    });
  });
  verifyRequest.end();
}

const callFusionAuthChangePassword = (outgoingResponse, body) => {
  const options = {
    host: config.host,
    port: config.port,
    path: '/api/user/change-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.apiKey
    }
  };
  const filteredBody = JSON.stringify({
    currentPassword: body.currentPassword,
    loginId: body.loginId,
    password: body.password
  });
  console.log('   ', filteredBody);
  const fusionAuthRequest = http.request(options, (fusionAuthResponse) => {
    var responseString = '';
    fusionAuthResponse.on('data', function (data) {
      responseString += data;
    });
    fusionAuthResponse.on('end', function () {
      console.log(fusionAuthResponse.statusCode, responseString);
      outgoingResponse.status(fusionAuthResponse.statusCode).send(responseString);
    });
  });
  fusionAuthRequest.write(filteredBody);
  fusionAuthRequest.end();
}

module.exports = {
  changePassword: verifyAccessToken
}
