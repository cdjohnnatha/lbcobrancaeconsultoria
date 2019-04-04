const i18n = require('i18n');

i18n.configure({
  locales: ['pt', 'en'],
  directory: `${__dirname}`,
  defaultLocale: 'pt',
  register: global,
  objectNotation: true,
  updateFiles: false,
});

module.exports = i18n;
