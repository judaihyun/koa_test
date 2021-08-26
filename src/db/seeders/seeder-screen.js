'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seeder up - screen');
    try{
      return await queryInterface.bulkInsert('screen', [
      {
        screen_no: 100,
        theater_name: '강남점',
        movie_no: 1,
        theater_no: 7001,
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        screen_no: 101,
        theater_name: '강남점',
        movie_no: 2,
        theater_no: 7001,
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        screen_no: 102,
        theater_name: '강남점',
        movie_no: 3,
        theater_no: 7001,
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        screen_no: 103,
        theater_name: '잠실점',
        movie_no: 2,
        theater_no: 7002,
        created_at :createdAt,
        updated_at :updatedAt,
      }],{})
    }catch(e){
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('screen', null, {});
  }
};
