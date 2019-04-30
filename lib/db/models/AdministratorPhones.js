const schema = require('./schemas/administrator/administrator_phone');

module.exports = (sequelize, { INTEGER, STRING, DATE }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: STRING(30),
      required: true,
    },
    administrator_id: {
      type: INTEGER,
      required: true,
      references: {
        model: 'administrators',
        key: 'id',
      },
    },
    deleted_at: DATE,
  };
  const settings = {
    underscored: true,
    paranoid: true,
    tableName: 'administrator_phones',
  };


  const AdministratorPhones = sequelize.define('AdministratorPhones', attributes, settings);
  AdministratorPhones.associate = ({ AdministratorPhones, Administrator }) => {
    AdministratorPhones.belongsTo(Administrator, {
      as: 'administrator',
      foreignKey: 'administrator_id',
    });
  };

  AdministratorPhones.Schema = schema;
  AdministratorPhones.Attributes = [
    'id',
    'number',
    'administrator_id',
    'created_at',
    'updated_at',
  ];

  return AdministratorPhones;
};
