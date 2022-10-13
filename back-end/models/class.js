'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  class.init({
    professor: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    frequency: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'class',
  });
  return class;
};