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
      professor_experience.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      }),
      professor_experience.belongsTo(models.Class, {
        as: 'user_class',
        foreignKey: 'user_id'
      })
    }
  }
  professor_experience.init({
    user_id: DataTypes.STRING,
    type: DataTypes.STRING,
    years: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'professor_experience',
  });
  return professor_experience;
};