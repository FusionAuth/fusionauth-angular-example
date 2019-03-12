const config = require ('../config/config.json');
const http = require('http');

const verifyAccessToken = (incomingRequest, outgoingResponse, successFunction) => {
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
        successFunction(incomingRequest, outgoingResponse);
      } else {
        outgoingResponse.status(401).send(responseString);
      }
    });
  });
  verifyRequest.end();
}

const example = (incomingRequest, outgoingResponse) => {
  outgoingResponse.send({ message: 'Success!'});
}

module.exports = {
  example: (i, o) => verifyAccessToken(i, o, example)
}
