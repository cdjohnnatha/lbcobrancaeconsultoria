import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import { houstonClientErrors, houstonServerErrors } from 'houston-errors';

const express = require('express');

const { NotFound } = houstonClientErrors;
const { INTERNAL_SERVER_ERROR } = houstonServerErrors;
const api = require('./config/routes');
const i18n = require('./config/locales');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/api', api);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// catch 404 and forward to error handler
app.use((req, res, next) => next(NotFound()));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.error = err.message;
  // render the error page
  res.status((err.status || err.code) || INTERNAL_SERVER_ERROR.code);
  res.send(err);
});

module.exports = app;
