/* eslint-disable no-underscore-dangle */
import { houstonClientErrors } from 'houston-errors';
import i18n from 'i18n';
import { generateJWT } from '../../helpers/jwt';
import userRepository from '../repositories/userRepository';
import signinSchema from '../../db/models/schemas/signin';
import { ValidateRequestInput } from '../../helpers/inputHelper';
import logger from '../../../config/logger';

const { NotFound, BadRequest } = houstonClientErrors;

const signIn = async ({ body }, res) => {
  try {
    await ValidateRequestInput(body, signinSchema);
    const user = await userRepository.findByEmail(body.email);
    if (!user) throw NotFound({ message: i18n.__('error.login') });
    if (userRepository.verifyPasswords(body.password, user.password)) {
      res.json(await generateJWT(user.id));
    } else {
      throw BadRequest();
    }
  } catch (error) {
    logger.fatal(error);
    throw error;
  }
};

module.exports = {
  signIn,
};
