'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category)
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    like: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(instance,options){
        instance.like = 0
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};