const faker = require('faker');
const { factory } = require('factory-girl');
const { Administrator } = require('../../lib/db/models/index');

factory.define('Administrator', Administrator, {
  name: () => faker.name.firstName(),
  cnpj: () => `${faker.random.number({ precision: 13 })}`,
  created_by: 1,
});

module.exports = factory;
