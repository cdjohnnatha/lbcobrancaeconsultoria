const express = require('express');

const router = express.Router();
const {
  index, show, create, destroy, update,
} = require('../../../lib/api/controllers/v1/usersController');

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
