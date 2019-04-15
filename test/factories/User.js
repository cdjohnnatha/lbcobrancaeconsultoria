const faker = require('faker');
const { factory } = require('factory-girl');
const bcrypt = require('bcrypt');
const { User } = require('../../lib/db/models/index');

factory.define('User', User, {
  email: () => faker.internet.email(),
  password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
  name: () => faker.name.firstName(),
});

module.exports = factory;
