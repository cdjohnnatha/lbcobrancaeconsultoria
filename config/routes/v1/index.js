const express = require('express');

const router = express.Router();
const users = require('./users');

// console.log(users);
router.use('/users', users);

module.exports = router;
