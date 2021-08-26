'use strict';

const createdAt = new Date();
const updatedAt = new Date();

function pricing(row, length) {
  if (row < length / 3) return '100000';
  else if (row < length / 1.5) return '60000';
  else return '30000';
}

function makeSeat(screenNum, maxRow, maxCol) 
/* screenNum = 상영관이 아닌, 상영목록ID를 의미(같은 상영관에서도 여러 영화가 상영됨)*/
{
  const seat = [];
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      const obj = {
        screen_no: screenNum,
        seat_name: `${String.fromCharCode(row + 65)}-${col}`,
        price: pricing(row, maxRow),
        created_at: createdAt,
        updated_at: updatedAt,
        is_book: 'N',
      }
      seat.push(obj);
    }
  }
  return seat;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seeder up - seat');
    try {
      await queryInterface.bulkInsert('seat', makeSeat(100,10,8), {})
      await queryInterface.bulkInsert('seat', makeSeat(101,10,8), {})
      await queryInterface.bulkInsert('seat', makeSeat(102,10,8), {})
      await queryInterface.bulkInsert('seat', makeSeat(103,8,7), {})
      return;
    } catch (e) {
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('seat', null, {});
  }
};
