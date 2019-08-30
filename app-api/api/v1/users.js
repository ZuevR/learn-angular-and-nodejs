const express = require('express');
const router = express.Router();
const { TokenHelper } = require('../../helpers');
const UserController = require('../../controllers').user;

router.get('/',
  TokenHelper.verifyToken,
  UserController.getAllUsers
);

router.post('/follow',
  TokenHelper.verifyToken,
  UserController.toggleFollow
);

router.post('/search',
  TokenHelper.verifyToken,
  UserController.search
);

module.exports = router;
