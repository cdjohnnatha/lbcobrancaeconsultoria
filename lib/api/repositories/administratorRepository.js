import { houstonClientErrors } from 'houston-errors';
import i18n from 'i18n';
import { Administrator, AdministratorAddresses } from '../../db/models/index';
import logger from '../../../config/logger';
import { repositoryErrorHandler } from '../../helpers/errorsHelper';
import { BuildPaginate, TotalPage } from '../../helpers/paginateHelper';
import { isRecordExists } from '../../helpers/dbHelper';


const { NotFound } = houstonClientErrors;


const list = async (params) => {
  try {
    const paginate = BuildPaginate(params);
    const results = await Administrator.findAndCountAll({
      attributes: Administrator.Attributes,
      limit: paginate.limit,
      offset: paginate.offset,
    });
    paginate.totalItems = results.count;
    paginate.totalPages = TotalPage(results.count, paginate.limit);
    paginate.data = results.rows;
    return paginate;
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
};

const findById = async (id) => {
  try {
    const user = await Administrator.findByPk(id, { attributes: Administrator.Attributes, raw: true });
    if (user === null) throw NotFound({ message: i18n.__('error.entity_not_found', 'Usuário', id) });
    return user;
  } catch (error) {
    logger.warn(error);
    throw repositoryErrorHandler(error);
  }
};

const create = async (params) => {
  try {
    const administrator = await Administrator.create(params, {
      attributes: Administrator.Attributes,
      include: [{
        model: AdministratorAddresses,
        as: 'address',
      }],
    });
    return administrator.get({ plain: true });
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
};

/**
 *
 * @param {object} params
 * @param {number} id.
 */
const update = async (params, { id }) => {
  try {
    const user = await Administrator.findByPk(id);
    const result = (await user.update(params, { attributes: Administrator.Attributes }));
    return result.get({ plain: true });
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
};

/**
 *
 * @param {number} id.
 */
async function destroy(id) {
  try {
    if (await isRecordExists(Administrator, { id })) return await Administrator.destroy({ where: { id } });
    throw NotFound({ message: i18n.__('error.entity_not_found', 'Usuário', id) });
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
}

const findByParams = (params) => {
  try {
    return Administrator.findOne({
      where: params,
    });
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
};

module.exports = {
  list,
  findById,
  create,
  update,
  destroy,
  findByParams,
};
