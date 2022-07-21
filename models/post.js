'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
  
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