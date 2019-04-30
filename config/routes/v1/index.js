const express = require('express');

const router = express.Router();
const users = require('./users');
const administrators = require('./administrators');

// console.log(users);
router.use('/users', users);
router.use('/administrators', administrators);

module.exports = router;
