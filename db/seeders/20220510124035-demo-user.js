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
        photoUrl:
          'https://i.pinimg.com/550x/31/23/2f/31232fe4b51b47763282524f008d9081.jpg',
      },
      {
        name: 'Daniil Postnik1',
        email: '2',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 2,
        photoUrl:
          'https://cdn.serif.com/affinity/img/photo/home/0121/og-photo-200120210858.jpg',
      },
      {
        name: 'Daniil Postnik2',
        email: '3',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 3,
        photoUrl:
          'https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-ru.jpg',
      },
      {
        name: 'Daniil Postnik3',
        email: '4',
        gmail: null,
        password:
          '$2a$05$snwmXFNExgDBXIo8UAMlK.E95exwiGaPz2mrrthu4T.jT/fAd.psG',
        refreshToken: null,
        roleId: 2,
        photoUrl:
          'https://i.pinimg.com/550x/31/23/2f/31232fe4b51b47763282524f008d9081.jpg',
      },
    ]);
  },
};
