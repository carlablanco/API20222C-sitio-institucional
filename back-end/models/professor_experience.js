'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professor_experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  professor_experience.init({
    user_id: DataTypes.STRING,
    type: DataTypes.STRING,
    years: DataTypes.INT
  }, {
    sequelize,
    modelName: 'professor_experience',
  });
  return professor_experience;
};