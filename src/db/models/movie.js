'use strict';
const {
  Model
} = require('sequelize');
  class movie extends Model {
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
  movie.init({
    no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defalutValue: sequelize.literal('now()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defalutValue: sequelize.literal('now()'),
    },
  }, {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'movie',
  });
  return movie;
};