import bcrypt from 'bcrypt';
import { houstonClientErrors } from 'houston-errors';
import i18n from 'i18n';
import { User } from '../../db/models/index';
import logger from '../../../config/logger';
import { repositoryErrorHandler } from '../../helpers/errorsHelper';
import { BuildPaginate, TotalPage } from '../../helpers/paginateHelper';
import { isRecordExists } from '../../helpers/dbHelper';

const { NotFound } = houstonClientErrors;

const list = async (params) => {
  try {
    const paginate = BuildPaginate(params);
    const results = await User.findAndCountAll({
      attributes: User.Attributes,
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

async function findById(id) {
  try {
    const user = await User.findByPk(id, { attributes: User.Attributes });
    if (user === null) throw NotFound({ message: i18n.__('error.entity_not_found', 'Usuário', id) });
    return user;
  } catch (error) {
    logger.warn(error);
    throw repositoryErrorHandler(error);
  }
}

async function create(params) {
  try {
    params.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10));
    const user = await User.create(params, { attributes: User.Attributes });
    return user;
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
}

// async function signUp(userParams) {
//   let user;
//   try {
//     const { dataValues: { id } } = await rolesRepository.findByParams({ name: 'user' });
//     userParams.roles = [id];
//     (user = await create(userParams));
//     return user;
//   } catch (error) {
//     logger.fatal(error);
//     if (user) {
//       if (recordsExists(User, 'users', user.id)) await destroy(user.id);
//     }
//     if (error.data[0] === 'email must be unique') {
//       error.data[0] = i18n.__('error.validations.unique_email');
//     }
//     throw repositoryErrorHandler(error);
//   }
// }

/**
 *
 * @param {object} params
 * @param {number} id.
 */
async function update(params, { id }) {
  try {
    const user = await User.findByPk(id);
    if ('password' in params) params.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10));
    const { dataValues: { password, reset_key, ...result } } = (await user.update(params));
    return result;
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
}

/**
 *
 * @param {number} id.
 */
async function destroy(id) {
  try {
    if (await isRecordExists(User, { id })) return await User.destroy({ where: { id } });
    throw NotFound({ message: i18n.__('error.entity_not_found', 'Usuário', id) });
  } catch (error) {
    logger.fatal(error);
    throw repositoryErrorHandler(error);
  }
}

// /**
//  * @param {id} userId - User id wich will be added the roles get from route.
//  * @param {array} roleIds - Array with integer ids from existent roles.
//  */
// async function addRole(userId, roleIds) {
//   try {
//     const user = await User.findByPk(userId, { attributes: User.Attributes });
//     if (user === null) {
//       throw NotFound();
//     }
//     const existence = await recordsExists(Roles, 'Roles', roleIds);
//     logger.fatal(existence);
//     const role = await user.addRoles(roleIds);
//     if (role.length > 0) {
//       return role;
//     }
//     throw UnprocessableEntity({ message: 'User already have this roles' });
//   } catch (error) {
//     logger.fatal(error);
//     throw repositoryErrorHandler(error);
//   }
// }

// /**
//  *
//  * @param {number} userId - User Id get from router
//  * @param {*} roleIds
//  */
// async function removeRole(userId, roleIds) {
//   try {
//     const user = await User.findByPk(userId, { attributes: User.Attributes });
//     if (user === null) {
//       throw NotFound();
//     }

//     return await user.removeRoles(roleIds);
//   } catch (error) {
//     logger.fatal(error);
//     throw repositoryErrorHandler(error);
//   }
// }

// function findByEmail(email) {
//   try {
//     return User.findOne({
//       where: { email },
//     });
//   } catch (error) {
//     logger.fatal(`userRepository.findByEmail: ${error}`);
//     throw repositoryErrorHandler(error);
//   }
// }

module.exports = {
  list,
  findById,
  create,
  update,
  destroy,
};
