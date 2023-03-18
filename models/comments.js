'use strict';
const User = require('./user.js');
const Posts = require('./posts.js');
const { sequelize } = require('../config/config');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {

    static associate(models) {
      // define association here
      Comments.belongsTo(models.Posts, { foreignKey: 'postId'});
      Comments.belongsTo(models.User, { foreignKey: 'userId'});
    }
  }

  Comments.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comments',
  });

  Comments.sync();

  return Comments;
};
