'use strict';
const {
  Model
} = require('sequelize');
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
module.exports = (sequelize, DataTypes) => {
  seat.init({
    screen_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    seat_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    price: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    is_book: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '예약유무',
    },
    created_at: {
      type: DataTypes.DATE,
      defalutValue: sequelize.literal('now()'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defalutValue: sequelize.literal('now()'),
    },
  }, {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'seat',
  });
  return seat;
};