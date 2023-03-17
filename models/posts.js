'use strict';
const user = require('./user');
const { sequelize } = require('../config/config');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {

    static associate(models) {
      // define association here
      Posts.belongsTo(models.User, { foreignKey: 'userId'});
    }
  }

  Posts.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Posts',
  });

  Posts.sync();

  return Posts;
};


