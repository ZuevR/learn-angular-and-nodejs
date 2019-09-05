'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          len: { args: 2, msg: 'Title must be atleast 2 characters in length' },
          notEmpty: { msg: 'Title is required' }
        }
      },
      content: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'Content is required' }
        }
      },
      author_id: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
        get() {
          const time = this.getDataValue('date');
          if (time) {
            return time.getTime();
          }
          return null;
        }
      }
    },
    {
      timestamps: false,
      tableName: 'posts'
    }
  );

  Post.findAllWithUserName = function () {
    const queryString = `select p.id,
                                p.title,
                                p.content,
                                extract(epoch from p.date)::float * 1000 as date,
                                u.name                                   as author_name
                         from posts p
                                  left join users u on p.author_id = u.id
                         order by p.date desc;`;
    return this.sequelize
      .query(queryString, { type: this.sequelize.QueryTypes.SELECT });
  };

  Post.findFriendsPosts = function (id) {
    const queryString = `select p.id,
                                p.title,
                                p.content,
                                extract(epoch from p.date)::float * 1000 as date,
                                u.name                                   as author_name
                         from posts p
                                  right join users u on p.author_id = u.id
                         where u.id in (select following from followers where follower = :id)
                           and p.author_id is not null
                         order by date desc`;
    return this.sequelize
      .query(queryString, { replacements: { id }, type: this.sequelize.QueryTypes.SELECT });
  };

  Post.associate = function (models) {
  };
  return Post;
};
