'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Vehicle, {foreignKey: 'typeId'} )
    }
  }
  Type.init({
    typeCar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "typeCar is required"
        },
        notNull: {
          msg: "typeCar is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};