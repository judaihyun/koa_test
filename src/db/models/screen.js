'use strict';
const {
  Model
} = require('sequelize');
  class screen extends Model {
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
  screen.init({
    screen_no:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    theater_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_no:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    theater_no:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'screen',
  });      
  return screen;
};