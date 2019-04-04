const express = require('express');

const router = express.Router();
const userControllers = require('../../../lib/api/controllers/v1/usersController');

router.get('/', userControllers.show);

module.exports = router;
