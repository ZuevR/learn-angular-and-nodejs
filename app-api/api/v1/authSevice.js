const express = require('express');
const router = express.Router();
const helper = require('../../helpers/token');
const userController = require('../../controllers').user;

// router.post('/sign-in', userController.signIn);

router.post('/sign-up', userController.add);

module.exports = router;
