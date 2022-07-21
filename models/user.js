'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    userName: {
      type:DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
        msg:`Username cannot be NULL`
      },
      notEmpty:{
        msg:`Username cannot be EMPTY`
      }
    }},
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
        msg:`Password cannot be NULL`
      },
      notEmpty:{
        msg:`Password cannot be EMPTY`
      }
    }},
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
        msg:`First name cannot be NULL`
      },
      notEmpty:{
        msg:`First name cannot be EMPTY`
      }
    }},
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
        msg:`Last name cannot be NULL`
      },
      notEmpty:{
        msg:`Last name cannot be EMPTY`
      }
    }},
    email: {
      type:DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
        msg:`E-mail cannot be NULL`
      },
      notEmpty:{
        msg:`E-mail cannot be EMPTY`
      }}
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};