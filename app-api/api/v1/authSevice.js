const express = require('express');
const router = express.Router();
const { FormHelper, TokenHelper } = require('../../helpers');
const UserController = require('../../controllers').user;

router.post('/sign-up',
  FormHelper.verifyPassword,
  FormHelper.processForm,
  FormHelper.generateHash,
  UserController.signUp
);

router.post('/sign-in',
  FormHelper.processForm,
  UserController.signIn
);

router.get('/check-user',
  TokenHelper.verifyToken,
  UserController.getIdentity
);

module.exports = router;
