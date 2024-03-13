'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vechile extends Model {
    static associate(models) {
      Vechile.belongsTo(models.User, {foreignKey: 'authorId'})
      Vechile.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Vechile.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name is required"
        },
        notNull: {
          msg: "name is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description is required"
        },
        notNull: {
          msg: "description is required"
        },
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "imgUrl is required"
        },
        notNull: {
          msg: "imgUrl is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "price is required"
        },
        notNull: {
          msg: "price is required"
        },
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoryId',
        key: 'id',
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Vechile',
  });
  return Vechile;
};