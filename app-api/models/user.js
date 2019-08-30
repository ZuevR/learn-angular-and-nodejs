'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: 2, msg: 'Name must be atleast 2 characters in length' },
          notEmpty: { msg: 'Name is required' }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: 'Incorrect email address' },
          notEmpty: { msg: 'Email is required' }
        },
        unique: { msg: 'Email address already in use!' }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );

  User.findFollowersByName = function (id, keyWord) {
    const key = `%${ keyWord }%`;
    const queryString = `select u.id, u.name, f.follower
                         from users u
                                  left join followers f on u.id = f.following and f.follower = :id
                         where u.name ilike :key
                           and u.id != :id
                         order by u.name`;
    return this.sequelize
      .query(queryString, { replacements: { id, key }, type: this.sequelize.QueryTypes.SELECT })
  };

  User.findAllFollowers = function (id) {
    const queryString = `select u.id, u.name, f.follower
                         from users u
                                  left join followers f on u.id = f.following
                             and f.follower = :id
                         where u.id <> :id
                         order by u.name`;
    return this.sequelize
      .query(queryString, { replacements: { id }, type: this.sequelize.QueryTypes.SELECT });
  };

  User.findFollowerById = function (userId, followingId) {
    const queryString = `select *
                         from followers
                         where follower = :userId
                           and following = :followingId`;
    return this.sequelize
      .query(queryString, { replacements: { userId, followingId }, type: this.sequelize.QueryTypes.SELECT });
  };

  User.createFollower = function (userId, followingId) {
    const queryString = `insert into followers (follower, following)
                         values (:userId, :followingId)`;
    return this.sequelize
      .query(queryString, { replacements: { userId, followingId }, type: this.sequelize.QueryTypes.INSERT });
  };

  User.deleteFollower = function (userId, followingId) {
    const queryString = `delete
                         from followers
                         where follower = :userId
                           and following = :followingId`;
    return this.sequelize
      .query(queryString, { replacements: { userId, followingId }, type: this.sequelize.QueryTypes.DELETE });
  };

  User.associate = function (models) {
  };

  return User;
};
