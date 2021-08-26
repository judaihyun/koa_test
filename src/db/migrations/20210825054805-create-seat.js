'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('seat', {
      screen_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      seat_name: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      price: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      is_book: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'N',
        comment: '예약유무',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('seat');
  }
};