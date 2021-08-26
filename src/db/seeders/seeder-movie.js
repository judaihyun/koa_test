'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seeder up - movie');
    try{
      return await queryInterface.bulkInsert('movie', [
      {
        no: 1,
        title: '영화1',
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        no: 2,
        title: '영화2',
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        no: 3,
        title: '영화3',
        created_at :createdAt,
        updated_at :updatedAt,
      },
    ],{})
    }catch(e){
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('movie', null, {});
  }
};
