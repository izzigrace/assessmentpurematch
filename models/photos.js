'use strict';
const user = require('./user');
const { sequelize } = require('../config/config');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {

    static associate(models) {
      // define association here
      Photos.belongsTo(models.Posts, { foreignKey: 'postId'});
    }
  }

  Photos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Photos',
  });

  Photos.sync();

  return Photos;
};

