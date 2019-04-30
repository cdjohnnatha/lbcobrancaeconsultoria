

module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE }) => queryInterface.createTable('administrator_sponsors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      type: STRING(80),
      allowNull: false,
    },
    email: {
      type: STRING(80),
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('administrator_sponsors'),
};
