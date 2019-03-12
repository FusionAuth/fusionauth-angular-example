const config = require ('../config/config.json');


const setCookies = (incomingRequest, outgoingResponse) => {
  const body = incomingRequest.body;
  const cookieSettings = { httpOnly: true };
  outgoingResponse.cookie('accessToken', body.token, cookieSettings);
  outgoingResponse.send();
}

const deleteCookies = (incomingRequest, outgoingResponse) => {
  const cookieSettings = { httpOnly: true, maxAge: 0 };
  outgoingResponse.cookie('accessToken', '', cookieSettings);
  outgoingResponse.send();
}

module.exports = {
  setCookies: setCookies,
  deleteCookies: deleteCookies
}
