const { SequelizeError } = require('houston-errors').apollo13;

/**
 *
 * @param {Error} error - check if is a possible code error, or sequelize.
 */
const repositoryErrorHandler = (error) => {
  if ('code' in error) {
    return error;
  }
  if (Array.isArray(error.errors)) {
    if (error.errors[0].origin === 'DB') {
      error.errors = error.errors.map(element => element.message);
    }
  }
  return SequelizeError(error);
};


module.exports = {
  repositoryErrorHandler,
};
