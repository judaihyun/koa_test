'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ticket.init({
    ticket_no: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    screen_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      comment: '관람완료여부',
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
    modelName: 'ticket',
  });
  return ticket;
};