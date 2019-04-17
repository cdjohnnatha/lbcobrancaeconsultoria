import express from 'express';

import passport from 'passport';
import v1 from './v1';
import auth from './auth';

require('../passport')(passport);

const router = express.Router();

router.use('/', auth);
router.use('/v1', passport.authenticate('jwt', { session: false }), v1);

module.exports = router;
