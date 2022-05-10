'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {}

  Roles.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      value: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'roles',
    },
  );
  return Roles;
};
