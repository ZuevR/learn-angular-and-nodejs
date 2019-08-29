const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.cookies.token;

  jwt.verify(token, 'inspirit', (err, decoded) => {
    if (decoded) {
      req._userId = decoded.userId;
      req._userName = decoded.userName;
      next();
    } else {
      res.status(401).send('Please login');
    }
  });
};

module.exports = {
  verifyToken,
};
