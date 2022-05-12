'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('category', [
      {
        name: 'Архитектурные',
      },
      {
        name: 'Религиозные',
      },
      {
        name: 'Патриотические',
      },
      {
        name: 'Культурные',
      },
    ]);
  },
};
