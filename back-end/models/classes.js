'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      classes.hasMany(models.class_comment,{
        as: 'comments',
        foreignKey: 'id_class'
      }),
      classes.hasOne(models.professor_experience,{
        as: 'professor_fk',
        foreignKey: 'user_id'
      }),
      classes.hasMany(models.student_class,{
        as: 'student',
        foreignKey: 'id_class'
      }),
      classes.belongsTo(models.User,{
        as: 'professor_user',
        foreignKey: 'professor'
      })
    }
  }
  classes.init({
    professor: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    frequency: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};