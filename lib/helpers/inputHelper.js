/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const Validator = require('jsonschema').validate;
const { UnprocessableEntity, NotAcceptable } = require('houston-errors');
/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
async function ValidateRequestInput(params, schema) {
  if (Object.keys(params).length === 0 && params.constructor === Object) {
    NotAcceptable();
  }
  const validation = Validator(params, schema).errors;
  if (validation.length !== 0) {
    let message = i18n.__('error.required');
    let argument;
    await validation.forEach((error) => {
      argument = Array.isArray(error.stack) ? error.stack[0] : error.stack;
      message += argument.replace(/["']/g, '');
      message += ', ';
    });
    message = message.substr(0, (message.length - 2));
    UnprocessableEntity({ message });
  }
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    if (value === '') {
      NotAcceptable({ message: i18n.__('error.required_field', key) });
    }
  });
}

module.exports = {
  ValidateRequestInput,
};
