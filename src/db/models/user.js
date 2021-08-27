'use strict';
const {
  Model
} = require('sequelize');
  class user extends Model {
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
  user.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'user',
  });
  return user;
};