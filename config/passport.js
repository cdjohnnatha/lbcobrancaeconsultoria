import { Strategy, ExtractJwt } from 'passport-jwt';
import 'dotenv';

import { findById } from '../lib/api/repositories/userRepository';

import logger from './logger';

const authentication = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET_TOKEN;
  passport.use(new Strategy(opts, async ({ user_id }, done) => {
    try {
      const user = await findById(user_id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      logger.fatal(error);
      return done(null, false);
    }
  }));
};

module.exports = authentication;
