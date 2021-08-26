'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class theater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  theater.init({
    no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    theater_name: {
      type: DataTypes.STRING,
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
    modelName: 'theater',
  });
  return theater;
};