'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('city', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      region_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
};
