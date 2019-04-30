const schema = require('./schemas/administrator/administrator_sponsor_phone');

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
    administrator_sponsor_id: {
      type: INTEGER,
      required: true,
      references: {
        model: 'administrator_sponsors',
        key: 'id',
      },
    },
    deleted_at: DATE,
  };
  const settings = {
    underscored: true,
    paranoid: true,
    tableName: 'administrator_sponsor_phones',
  };


  const AdministratorSponsorPhones = sequelize.define('AdministratorSponsorPhones', attributes, settings);
  AdministratorSponsorPhones.associate = ({ AdministratorSponsorPhones, AdministratorSponsors }) => {
    AdministratorSponsorPhones.belongsTo(AdministratorSponsors, {
      as: 'sponsor',
      foreignKey: 'administrator_id',
    });
  };

  AdministratorSponsorPhones.Schema = schema;
  AdministratorSponsorPhones.Attributes = [
    'id',
    'number',
    'created_at',
    'updated_at',
  ];

  return AdministratorSponsorPhones;
};
