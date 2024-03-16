'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Vechile, {foreignKey: 'authorId'} )
      User.hasMany(models.Order, { foreignKey: 'userId' })
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "fullName is required"
        },
        notNull: {
          msg: "fullName is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email is required"
        },
        notNull: {
          msg: "email is required"
        },
        isEmail: {
          args: true,
          msg: "invalid format email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: "password is required"
        },
        isLength: {
          args: { min: 5},
          msg: "password min 5 character or more"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff"
    }, 
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};