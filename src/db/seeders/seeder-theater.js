'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seeder up - theater');
    try{
      return await queryInterface.bulkInsert('theater', [
      {
        no: 7001,
        theater_name: '강남점',
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        no: 7002,
        theater_name: '잠실점',
        created_at :createdAt,
        updated_at :updatedAt,
      }],{})
    }catch(e){
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('theater', null, {});
  }
};
