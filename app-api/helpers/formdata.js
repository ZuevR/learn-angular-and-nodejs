const crypt = require('bcrypt');

const verifyPassword = (req, res, next) => {

  const password = req.body.password;

  if (password.length < 6) {
    res.status(400).send('Password must be atleast 6 characters in length');
  } else {
    next();
  }
};

const comparePassword = (formPassword, basePassword) => {
  return crypt.compareSync(formPassword, basePassword);
};

const processForm = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }
  next();
};

const generateHash = (req, res, next) => {
  const password = req.body.password.trim();
  req.body.password = crypt.hashSync(password, 3);
  next();
};

module.exports = {
  verifyPassword,
  comparePassword,
  processForm,
  generateHash
};
