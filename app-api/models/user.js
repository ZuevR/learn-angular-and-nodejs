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
        validate: { len: { args: 2, msg: 'Name must be atleast 2 characters in length' } }
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: { msg: 'Incorrect email address' } },
        unique: { msg: 'Email address already in use!' }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );

  User.associate = function (models) {
  };

  return User;
};
