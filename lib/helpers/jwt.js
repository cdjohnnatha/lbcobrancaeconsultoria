/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('houston-errors').houstonClientErrors;
const i18n = require('i18n');
const logger = require('../../config/logger');

const generateJWT = async (user_id) => {
  try {
    const exp = new Date();
    const expirationTokenTime = process.env.TOKEN_EXPIRATION_DAYS || 1;
    exp.setDate(exp.getDate() + expirationTokenTime);
    const generatedToken = jwt.sign({
      user_id,
    }, process.env.JWT_SECRET_TOKEN, { expiresIn: `${expirationTokenTime}d` });
    if (generatedToken instanceof Error) { throw generatedToken; }
    return { jwt: generatedToken };
  } catch (error) {
    error.message = [...error.message, i18n.__('error.jwt.generate')];
    logger.fatal(error);
    throw Unauthorized({ message: error.message });
  }
};

const validateToken = param => new Promise((resolve, reject) => {
  jwt.verify(param, process.env.ASSISTA_JWT_TOKEN, (err, decoded) => {
    if (err) {
      logger.fatal(err);
      reject(err);
    }
    resolve(decoded);
  });
});


module.exports = {
  generateJWT,
  validateToken,
};
