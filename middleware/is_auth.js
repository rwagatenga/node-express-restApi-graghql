const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    //--APIs and WebSocket Authentication
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;

    //--GraphQl Authentication
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret');
  } catch (err) {
    //--APIs And WebSocket--
    // err.statusCode = 500;
    // throw err;

    //--GraphQl Auth
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    //--APIs and WebSocket
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;
    req.isAuth = false;
    return next();
  }
  //--APIs and Websocket
  // req.userId = decodedToken.userId;
  // next();

  //--GraphQl
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};