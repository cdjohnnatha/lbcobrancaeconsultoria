const userRepository = require('../../repositories/userRepository');

const index = async ({ query }, res) => {
  try {
    res.send(await userRepository.list(query));
  } catch (error) {
    throw error;
  }
};

const show = async ({ params }, res, next) => {
  try {
    res.send(await userRepository.findById(params.id));
  } catch (error) {
    next(error);
  }
};

const create = async ({ body }, res) => {
  try {
    res.send(await userRepository.create(body));
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  show,
  index,
  create,
};
