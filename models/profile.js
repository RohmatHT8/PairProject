'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
    }
    get formatDate(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return this.dateOfBirth.toLocaleDateString('id-ID', options)
    }
  }
  Profile.init({
    displayName: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Display name cannot be NULL`
    },
    notEmpty:{
      msg:`Display name cannot be EMPTY`
    }
  }},
    profilePicture: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Profile picture cannot be NULL`
    },
    notEmpty:{
      msg:`Profile picture cannot be EMPTY`
    }
  }},
    dateOfBirth: {type: DataTypes.DATE,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Date of Birth cannot be NULL`
    },
    notEmpty:{
      msg:`Date of Birth cannot be EMPTY`
    }
  }},
    UserId: {type: DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notNull:{
      msg:`User Id cannot be NULL`
    },
    notEmpty:{
      msg:`User Id cannot be EMPTY`
    }
  }}
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};