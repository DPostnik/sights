'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Daniil Postnik',
        email: '1',
        gmail: '1',
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 1,
      },
      {
        name: 'Daniil Postnik1',
        email: '2',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 2,
      },
      {
        name: 'Daniil Postnik2',
        email: '3',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 3,
      },
      {
        name: 'Daniil Postnik3',
        email: '4',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 2,
      },
    ]);
  },
};
