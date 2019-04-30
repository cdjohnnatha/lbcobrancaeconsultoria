import repository from '../../repositories/administratorRepository';
import schema from '../../../db/models/schemas/administrator/administrator';
import { ValidateRequestInput } from '../../../helpers/inputHelper';

const index = async ({ query }, res, next) => {
  try {
    res.send(await repository.list(query));
  } catch (error) {
    next(error);
  }
};

const show = async ({ params }, res, next) => {
  try {
    res.send(await repository.findById(params.id));
  } catch (error) {
    next(error);
  }
};

const create = async ({ body, user }, res, next) => {
  try {
    await ValidateRequestInput(body, schema);
    body.created_by = user.id;
    res.send(await repository.create(body));
  } catch (error) {
    next(error);
  }
};

const update = async ({ body, params }, res, next) => {
  try {
    res.send(await repository.update(body, params));
  } catch (error) {
    next(error);
  }
};

const destroy = async ({ params }, res, next) => {
  try {
    await repository.destroy(params.id);
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
