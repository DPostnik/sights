'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('region', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
};
