const express = require('express');

const router = express.Router();
const { index, show, create } = require('../../../lib/api/controllers/v1/usersController');

router.get('/', index);
router.get('/:id', show);
router.post('/', create);

module.exports = router;
