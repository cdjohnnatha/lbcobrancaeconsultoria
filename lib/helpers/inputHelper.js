/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const Validator = require('jsonschema').validate;
const { UnprocessableEntity, NotAcceptable } = require('houston-errors').houstonClientErrors;
/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
async function ValidateRequestInput(params, schema) {
  if (Object.keys(params).length === 0 && params.constructor === Object) throw NotAcceptable({ message: i18n.__('error.empty_fields') });
  const { errors } = Validator(params, schema);
  if (errors.length !== 0) {
    let message = '';
    let field;
    await errors.forEach(({ stack, argument }) => {
      field = Array.isArray(stack) ? stack[0] : stack;
      if (field.includes('instance requires property')) field = i18n.__('error.required_field', argument);
      if (field.includes('instance additionalProperty')) field = i18n.__('error.instance_additionalProperty', argument);
      message += field.replace(/["']/g, '');
      message += ', ';
    });
    message = message.substr(0, (message.length - 2));
    throw UnprocessableEntity({ message });
  }
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    if (value === '') throw NotAcceptable({ message: i18n.__('error.required_field', key) });
  });
}

module.exports = {
  ValidateRequestInput,
};
