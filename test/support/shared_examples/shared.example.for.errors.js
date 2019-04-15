const chai = require('chai');

const { expect } = chai;

exports.shouldBehaveLikeAnError = (object) => {
  expect(object).to.have.a.property('name');
  expect(object).to.have.a.property('error');
  expect(object).to.have.a.property('code');
};
