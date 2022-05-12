'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('country', [
      {
        name: 'Беларусь',
      },
    ]);
  },
};
