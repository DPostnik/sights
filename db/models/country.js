'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {}
  country.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'country',
    },
  );
  return country;
};
