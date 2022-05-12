'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class region extends Model {}
  region.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'region',
    },
  );
  return region;
};
