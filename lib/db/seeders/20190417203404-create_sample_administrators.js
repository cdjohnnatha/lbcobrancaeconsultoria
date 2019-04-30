const { random, company } = require('faker');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'administrators',
    [
      {
        name: company.companyName(),
        cnpj: random.number({ precision: 14 }),
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ], {},
  ),

  down: ({ sequelize }) => sequelize.query('remove FROM administrators where name like "%"'),
};
