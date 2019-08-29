'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};