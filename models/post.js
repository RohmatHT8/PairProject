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
    static postCount(userId){
      return Post.findAll({where:{UserId:userId},
      attributes:[[sequelize.fn('COUNT',sequelize.col('id')),'postCount']]})
    }
  }
  Post.init({
    title: {type:DataTypes.STRING,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Title cannot be NULL`
    },
    notEmpty:{
      msg:`Title cannot be EMPTY`
    }
  }},
    description: {type:DataTypes.STRING,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Description cannot be NULL`
    },
    notEmpty:{
      msg:`Description cannot be EMPTY`
    }
  }},
    like: {type:DataTypes.INTEGER},
    imageUrl: {type:DataTypes.STRING,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Image Url cannot be NULL`
    },
    notEmpty:{
      msg:`Image Url cannot be EMPTY`
    }
  }},
    UserId: {type:DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notNull:{
      msg:`User id cannot be NULL`
    },
    notEmpty:{
      msg:`User id cannot be EMPTY`
    }
  }},
    CategoryId: {type:DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notNull:{
      msg:`Category cannot be NULL`
    },
    notEmpty:{
      msg:`Category cannot be EMPTY`
    }
  }}
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