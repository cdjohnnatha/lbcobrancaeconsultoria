const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        email: 'lb@admin.com.br',
        password: bcrypt.hashSync('lbadmin', bcrypt.genSaltSync(10)),
        name: faker.name.firstName(),
        reset_key: bcrypt.hashSync('lbadmin', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        email: 'lb@user.com.br',
        password: bcrypt.hashSync('lbuser', bcrypt.genSaltSync(10)),
        name: faker.name.firstName(),
        reset_key: bcrypt.hashSync('lbuser', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ], {},
  ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
