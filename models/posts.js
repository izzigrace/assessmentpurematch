'use strict';
const user = require('./user');
const { sequelize } = require('../config/config');
const moment = require('moment');

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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });

  // calculate how long ago post was made
  Posts.prototype.getTimeAgo = function() {
    return moment(this.createdAt).fromNow();
  }


  Posts.sync();

  return Posts;
};
