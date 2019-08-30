const jwt = require('jsonwebtoken');

const generateToken = payload => {
  return jwt.sign({
      id: payload.id,
      name: payload.name
    },
    'inspirit',
    { expiresIn: '24h' }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      req._userId = decoded.id;
      req._userName = decoded.name;
      next();
    } else {
      res.status(401).send({ message: 'Please login' });
    }
  });
};

module.exports = {
  generateToken,
  verifyToken
};
