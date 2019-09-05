const { User } = require('../models');
const { TokenHelper, FormHelper, ResponseHelper } = require('../helpers');

module.exports = {
  signUp(req, res) {
    return User
      .create(req.body)
      .then(user => {
        const token = TokenHelper.generateToken(user.dataValues);
        res.status(201).send({ userName: user.name, token })
      })
      .catch(error => res.status(400).send(error));
  },

  signIn(req, res) {
    return User
      .findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          return res.status(404).send(ResponseHelper.error('User with this email address does not exist'));
        }
        const match = FormHelper.comparePassword(req.body.password, user.password);
        if (match) {
          const token = TokenHelper.generateToken(user.dataValues);
          return res.status(200).send({ userName: user.name, token });
        }
        return res.status(401).send(ResponseHelper.error('Wrong password'))
      })
      .catch(error => res.status(400).send(error));
  },

  getIdentity(req, res) {
    return res.status(200).send({ userName: req._userName });
  },

  getAllUsers(req, res) {
    const id = req._userId;
    return User
      .findAllFollowers(id)
      .then(users => res.status(200).send({ users, id }))
      .catch(error => console.log(error));
  },

  toggleFollow(req, res) {
    const id = req._userId;
    const targetId = req.body.id;

    return User
      .findFollowerById(id, targetId)
      .then(follower => {
        if (follower.length) {
          return User
            .deleteFollower(id, targetId)
            .then(() => res.status(202).send({ message: 'deleted' }));
        } else {
          return User
            .createFollower(id, targetId)
            .then(() => res.status(201).send({ message: 'created' }));
        }
      })
      .catch(error => res.status(400).send(error));
  },

  search(req, res) {
    const id = req._userId;
    const keyWord = req.body.keyWord;
    return User
      .findFollowersByName(id, keyWord)
      .then(users => res.status(200).send({ payload: users, id }));
  }

};
