
import express from 'express';

const router = express.Router();
const { signIn } = require('../../lib/api/controllers/authController');

router.use('/signin', signIn);
module.exports = router;
