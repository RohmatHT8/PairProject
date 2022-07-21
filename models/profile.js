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
    displayName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};