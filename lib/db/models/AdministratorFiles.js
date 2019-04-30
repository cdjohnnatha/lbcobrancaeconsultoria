const schema = require('./schemas/administrator/administrator_phone');

module.exports = (sequelize, { INTEGER, STRING }) => {
  const attributes = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      required: true,
    },
    path: {
      type: STRING,
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
  };
  const settings = {
    underscored: true,
    tableName: 'administrator_files',
  };


  const AdministratorFiles = sequelize.define('AdministratorFiles', attributes, settings);
  AdministratorFiles.associate = ({ AdministratorFiles, Administrator }) => {
    AdministratorFiles.belongsTo(Administrator, {
      as: 'administrator',
      foreignKey: 'administrator_id',
    });
  };

  AdministratorFiles.Schema = schema;
  AdministratorFiles.Attributes = [
    'id',
    'number',
    'administrator_id',
    'created_at',
    'updated_at',
  ];

  return AdministratorFiles;
};
