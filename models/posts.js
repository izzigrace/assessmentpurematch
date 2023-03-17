'use strict';
const user = require('./user');
const { sequelize } = require('../config/config');
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {

    static associate(models) {
      // define association here
      Posts.belongsTo(models.User, { foreignKey: 'userId'});
    }
  }

  Posts.init({
    id: {
      type: DataTypes.NUMBER,
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully estblished connection');
    await User.sync({ force: true });
    console.log('Successful syncing with user model');
  } catch (error) {
    console.error('Cannot to connect to the database:', error);
  }
})();

