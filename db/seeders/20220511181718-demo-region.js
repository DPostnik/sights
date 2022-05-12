'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('region', [
      {
        name: 'Брестская область',
        country_id: 1,
      },
      {
        name: 'Витебская область',
        country_id: 1,
      },
      {
        name: 'Гомельская область',
        country_id: 1,
      },
      {
        name: 'Гродненская область',
        country_id: 1,
      },
      {
        name: 'Минская область',
        country_id: 1,
      },
      {
        name: 'Могилёвская область',
        country_id: 1,
      },
    ]);
  },
};
