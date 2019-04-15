import userRepository from '../../repositories/userRepository';
import schema from '../../../db/models/schemas/user';
import { ValidateRequestInput } from '../../../helpers/inputHelper';

const index = async ({ query }, res, next) => {
  try {
    res.send(await userRepository.list(query));
  } catch (error) {
    next(error);
  }
};

const show = async ({ params }, res, next) => {
  try {
    res.send(await userRepository.findById(params.id));
  } catch (error) {
    next(error);
  }
};

const create = async ({ body }, res, next) => {
  try {
    await ValidateRequestInput(body, schema);
    res.send(await userRepository.create(body));
  } catch (error) {
    next(error);
  }
};

const update = async ({ body, params }, res, next) => {
  try {
    res.send(await userRepository.update(body, params));
  } catch (error) {
    next(error);
  }
};

const destroy = async ({ params }, res, next) => {
  try {
    await userRepository.destroy(params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  show,
  index,
  create,
  update,
  destroy,
};
