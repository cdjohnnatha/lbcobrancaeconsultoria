const bcrypt = require('bcrypt');
const schema = require('./schemas/user');

module.exports = (sequelize, { INTEGER, STRING, DATE }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: STRING,
      unique: true,
      required: true,
      validate: {
        isEmail: true,
      },
    },
    password: STRING,
    name: STRING,
    reset_key: STRING,
    deleted_at: DATE,
  };
  const settings = {
    underscored: true,
    paranoid: true,
    tableName: 'users',
  };


  const User = sequelize.define('User', attributes, settings);
  User.associate = (models) => { };

  User.Schema = schema;
  User.Attributes = [
    'id',
    'name',
    'email',
    'password',
    'created_at',
    'updated_at',
  ];

  User.comparePasswords = (requestPassword, userPassword) => bcrypt.compare(requestPassword, userPassword);
  return User;
};
