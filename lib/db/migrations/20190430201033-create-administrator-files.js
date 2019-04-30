

module.exports = {
  up: (queryInterface, { STRING, INTEGER, DATE }) => queryInterface.createTable('administrator_files', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    path: {
      type: STRING,
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
  }),
  down: queryInterface => queryInterface.dropTable('administrator_files'),
};
