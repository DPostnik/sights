module.exports = {
  development: {
    username: 'postgres',
    password: '1',
    database: 'sights_of_belarus',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
