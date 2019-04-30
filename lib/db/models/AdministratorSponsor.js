const schema = require('./schemas/administrator/administrator_sponsor');

module.exports = (sequelize, { INTEGER, STRING, DATE }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING(80),
      required: true,
    },
    email: {
      type: STRING(80),
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      },
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
    tableName: 'administrator_sponsors',
  };


  const AdministratorSponsors = sequelize.define('AdministratorSponsors', attributes, settings);
  AdministratorSponsors.associate = ({
    AdministratorSponsors,
    AdministratorSponsorPhones,
    Administrator,
  }) => {
    AdministratorSponsors.belongsTo(Administrator, {
      as: 'administrator',
      foreignKey: 'administrator_id',
    });
    AdministratorSponsors.hasMany(AdministratorSponsorPhones, {
      as: 'phones',
      foreignKey: 'administrator_sponsor_id',
    });
  };

  AdministratorSponsors.Schema = schema;
  AdministratorSponsors.Attributes = [
    'id',
    'name',
    'email',
    'administrator_id',
    'created_at',
    'updated_at',
  ];

  return AdministratorSponsors;
};
