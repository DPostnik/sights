'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('city', [
      {
        name: 'Барановичи',
        region_id: 1,
      },
      {
        name: 'Брест',
        region_id: 1,
      },
      {
        name: 'Витебск',
        region_id: 2,
      },
      {
        name: 'Ушачи',
        region_id: 2,
      },
      {
        name: 'Гомель',
        region_id: 3,
      },
      {
        name: 'Речица',
        region_id: 3,
      },
      {
        name: 'Гродно',
        region_id: 4,
      },
      {
        name: 'Лида',
        region_id: 4,
      },
      {
        name: 'Минск',
        region_id: 5,
      },
      {
        name: 'Солигорск',
        region_id: 5,
      },
      {
        name: 'Могилёв',
        region_id: 6,
      },
      {
        name: 'Бобруйск',
        region_id: 6,
      },
    ]);
  },
};
