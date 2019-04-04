const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { NotFound } = require('houston-errors').houstonClientErrors;
const { INTERNAL_SERVER_ERROR } = require('houston-errors').houstonServerErrors;
const api = require('./config/routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(api);
app.use('/api', api);


// catch 404 and forward to error handler
app.use((req, res, next) => next(NotFound()));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || INTERNAL_SERVER_ERROR.code);
  res.send(err);
});

module.exports = app;
