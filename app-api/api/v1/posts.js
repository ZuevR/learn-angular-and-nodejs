const express = require('express');
const router = express.Router();
const { TokenHelper } = require('../../helpers');
const PostController = require('../../controllers').post;


router.get('/',
  PostController.getPosts
);

router.post('/create',
  TokenHelper.verifyToken,
  PostController.createPost
);

router.get('/friends-posts',
  TokenHelper.verifyToken,
  PostController.getFriendsPosts
);

router.get('/my-posts',
  TokenHelper.verifyToken,
  PostController.getMyPosts
);

module.exports = router;
