'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('followers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      following: {
        type: Sequelize.INTEGER,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('followers');
  }
};
