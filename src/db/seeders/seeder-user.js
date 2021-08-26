'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      // decode : Buffer.from(b64Encoded, 'base64').toString()
      return await queryInterface.bulkInsert('user', [
      {
        id:'booker1',
        password:Buffer.from('booker1').toString('base64'),
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        id:'booker2',
        password:Buffer.from('booker2').toString('base64'),
        created_at :createdAt,
        updated_at :updatedAt,
      },
      {
        id:'booker3',
        password:Buffer.from('booker3').toString('base64'),
        created_at :createdAt,
        updated_at :updatedAt,
      },
    ],{})
    }catch(e){
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('user', null, {});
  }
};
