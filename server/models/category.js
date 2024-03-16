'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Vechile, {foreignKey: 'categoryId'})
    }
  }
  Category.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category is required"
        },
        notNull: {
          msg: "Category is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};