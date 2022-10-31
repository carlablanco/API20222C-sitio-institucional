'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student_class.belongsTo(models.classes, {
        as: 'class_student',
        foreignKey: 'id_class'
      }),
        student_class.belongsTo(models.User, {
          as: 'user_student',
          foreignKey: 'id_student'
        })
    }
  }
  student_class.init({
    id_class: DataTypes.STRING,
    id_student: DataTypes.STRING,
    status: DataTypes.STRING,
    timeslot: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_class',
  });
  return student_class;
};