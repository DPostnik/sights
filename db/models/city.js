'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {}
  city.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      region_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'city',
    },
  );
  return city;
};
