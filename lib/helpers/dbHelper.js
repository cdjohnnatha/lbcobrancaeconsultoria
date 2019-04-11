const logger = require('../../config/logger');
const { NotFound } = require('houston-errors').houstonClientErrors;

/**
 * @param {object} dbObject - DB Sequelize entity.
 * @param {string} entityName - Entity name which will be showed in case of error.
 * @param {Array} id - Id which will check the record existence in database.
 */
async function recordExists(dbObject, entityName, id) {
  try {
    const existence = await dbObject.count({ where: { id } });
    if (existence === 0) {
      throw NotFound({ message: `${entityName} must exist` });
    }
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
}
/**
 * @param {object} dbObject - DB Sequelize entity.
 * @param {string} entityName - Entity name which will be showed in case of error.
 * @param {Array} id - Id which will check the record existence in database.
 */
async function recordExistsByParams(dbObject, entityName, params) {
  try {
    const existence = await dbObject.count({ where: params });
    if (existence === 0) {
      throw NotFound({ message: `${entityName} must exist` });
    }
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
}
/**
 * @param {object} dbObject - DB Sequelize entity.
 * @param {Array} params - params from model in database.
 */
async function isRecordExists(dbObject, params) {
  try {
    const existence = await dbObject.count({ where: params });
    if (existence === 0) {
      return false;
    }
    return true;
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
}

/**
 * @param {object} dbObject - DB Sequelize entity.
 * @param {string} entityName - Entity name which will be showed in case of error.
 * @param {Array} arr - Array of id's which will be check the record existences in database.
 */
async function recordsExists(dbObject, entityName, arr) {
  let existence = 0;
  try {
    for (const element of arr) {
      existence = await dbObject.count({ where: { id: element } });
      logger.warn(existence);
      if (existence === 0) {
        throw NotFound({ message: `${entityName} must exist` });
      }
    }
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
}

async function rollBackEntity(Model, entityName, id) {
  try {
    if (recordExists(Model, entityName, id)) {
      return await Model.destroy({ where: { id } });
    }
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
}

module.exports = {
  recordExists,
  recordsExists,
  recordExistsByParams,
  rollBackEntity,
  isRecordExists,
};
