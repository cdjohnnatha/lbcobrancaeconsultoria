const schema = require('./schemas/administrator_address');

module.exports = (sequelize, { INTEGER, STRING, DATE }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: STRING(100),
      required: true,
    },
    neighbohood: {
      type: STRING(100),
      required: true,
    },
    state: {
      type: STRING(50),
      required: true,
    },
    postal_code: {
      type: STRING(50),
      required: true,
    },
    number: {
      type: STRING(15),
      required: true,
    },
    obs: {
      type: STRING(255),
      required: false,
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
    tableName: 'administrator_addresses',
  };


  const AdministratorAddresses = sequelize.define('AdministratorAddresses', attributes, settings);
  AdministratorAddresses.associate = ({ AdministratorAddresses: AdministratorAddress, Administrator }) => {
    AdministratorAddress.belongsTo(Administrator, {
      as: 'administrator',
      foreignKey: 'administrator_id',
    });
  };

  AdministratorAddresses.Schema = schema;
  AdministratorAddresses.Attributes = [
    'id',
    'street',
    'neighbohood',
    'state',
    'postal_code',
    'obs',
    'administrator_id',
    'created_at',
    'updated_at',
  ];

  return AdministratorAddresses;
};
