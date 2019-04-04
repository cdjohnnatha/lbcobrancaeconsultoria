require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'lbcobrancaeconsultoria',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
};
