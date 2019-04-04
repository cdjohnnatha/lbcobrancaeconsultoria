const userRepository = require('../../repositories/userRepository');

const show = (req, res) => {
  console.log('>>>>>>>>>>>');
  res.send('ok');
  // res.send(userRepository.getUserById());
};

module.exports = {
  show,
};
