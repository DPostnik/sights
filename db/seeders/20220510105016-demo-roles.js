'use strict';

const Roles = {
  AUTHENTICATED_USER: 'AUTH_USER',
  UNAUTHENTICATED_USER: 'NOT_AUTH_USER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
};
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('roles', [
      {
        value: Roles.ADMIN,
        description: 'Администратор',
      },
      {
        value: Roles.AUTHENTICATED_USER,
        description: 'Аутентифицированный пользователь',
      },
      {
        value: Roles.MODERATOR,
        description: 'Модератор',
      },
    ]);
  },
};
