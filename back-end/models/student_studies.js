'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_studies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_studies.init({
    user_id: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_studies',
  });
  return student_studies;
};