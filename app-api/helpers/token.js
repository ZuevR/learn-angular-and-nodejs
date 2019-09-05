const jwt = require('jsonwebtoken');
const ResponseHelper = require('./response');

const generateToken = payload => {
  const exp = Math.floor(Date.now() / 1000) + 3600;

  const sign = jwt.sign({
      exp,
      id: payload.id,
      name: payload.name
    },
    'inspirit'
  );

  return {
    exp,
    id: sign
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      req._userId = decoded.id;
      req._userName = decoded.name;
      next();
    } else {
      res.status(401).send(ResponseHelper.error('Authorization failed'));
    }
  });
};

module.exports = {
  generateToken,
  verifyToken
};
