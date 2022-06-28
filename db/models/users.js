'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {}
  users.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      gmail: { type: DataTypes.STRING, allowNull: true },
      password: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      photoUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
