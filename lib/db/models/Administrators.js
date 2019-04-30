const schema = require('./schemas/administrator/administrator');

module.exports = (sequelize, { INTEGER, STRING, DATE }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING(100),
      required: true,
    },
    cnpj: {
      type: STRING(25),
      required: true,
    },
    email: {
      type: STRING(80),
      unique: true,
      required: false,
      validate: {
        isEmail: true,
      },
    },
    created_by: {
      type: INTEGER,
      required: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    deleted_at: DATE,
  };
  const settings = {
    underscored: true,
    paranoid: true,
    tableName: 'administrators',
  };


  const Administrator = sequelize.define('Administrator', attributes, settings);
  Administrator.associate = ({
    AdministratorAddresses,
    Administrator,
    AdministratorPhones,
    AdministratorSponsors,
  }) => {
    Administrator.hasOne(AdministratorAddresses, {
      as: 'address',
      foreignKey: 'administrator_id',
    });
    Administrator.hasMany(AdministratorPhones, {
      as: 'phones',
      foreignKey: 'administrator_id',
    });
    Administrator.hasOne(AdministratorSponsors, {
      as: 'sponsor',
      foreignKey: 'administrator_id',
    });
  };

  Administrator.Schema = schema;
  Administrator.Attributes = [
    'id',
    'name',
    'cnpj',
    'created_by',
    'created_at',
    'updated_at',
  ];

  return Administrator;
};
