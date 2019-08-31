const { Post } = require('../models');

module.exports = {
  getPosts(req, res) {
    return Post
      .findAllWithUserName()
      .then(posts => res.status(200).send(posts))
      .catch(error => console.log(error));
  },

  createPost(req, res) {
    return Post
      .create(req.body)
      .then(post => res.status(201).send(post))
      .catch(error => console.log(error));
  },

  getFriendsPosts(req, res) {
    const id = req._userId;
    return Post
      .findFriendsPosts(id)
      .then(posts => res.status(200).send(posts))
      .catch(error => console.log(error));
  },

  getMyPosts(req, res) {
    const id = req._userId;
    return Post
      .findAll({
        where: { author_id: id },
        order: [
          ['date', 'DESC']
        ]
      })
      .then(posts => res.status(200).send(posts))
      .catch(error => console.log(error));
  }
};
