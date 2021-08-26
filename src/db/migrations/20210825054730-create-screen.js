'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('screen', {
      screen_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      theater_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      movie_no:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      theater_no:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('screen');
  }
};