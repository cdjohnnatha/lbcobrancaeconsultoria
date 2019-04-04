

module.exports = {
  up: (queryInterface, { INTEGER, DATE, STRING }) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    email: {
      type: STRING(60),
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    reset_key: {
      type: STRING,
      allowNull: true,
    },
    created_at: {
      allowNull: false,
      type: DATE,
    },
    updated_at: {
      allowNull: false,
      type: DATE,
    },
    deleted_at: {
      allowNull: true,
      type: DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
};
