const User = require('../models').User;
const test = {
  name: 'ts',
  email: 'tesss@taasdil.ru',
  password: ''
};
module.exports = {
  add(req, res) {
    return User
      .create(test)
      // .then(res => console.log(res.name))
      .then((classroom) => res.status(201).send(classroom))
      .catch((error) => res.status(400).send(error));
  },
};
