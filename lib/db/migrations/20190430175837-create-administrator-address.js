

module.exports = {
  up: (queryInterface, { STRING, DATE, INTEGER }) => queryInterface.createTable('administrator_addresses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    street: {
      type: STRING(100),
      allowNull: false,
    },
    neighbohood: {
      type: STRING(100),
      allowNull: false,
    },
    state: {
      type: STRING(50),
      allowNull: false,
    },
    postal_code: {
      type: STRING(50),
      allowNull: false,
    },
    number: {
      type: STRING(15),
      allowNull: false,
    },
    obs: {
      type: STRING(255),
      allowNull: true,
    },
    administrator_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'administrators',
        key: 'id',
      },
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
  down: queryInterface => queryInterface.dropTable('AdministratorAddresses'),
};
