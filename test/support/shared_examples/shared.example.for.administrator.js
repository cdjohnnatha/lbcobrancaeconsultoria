const chai = require('chai');

const { expect } = chai;

const shouldBehaveLikeAnAdministrator = (object) => {
  expect(object).to.have.a.property('id');
  expect(object).to.have.a.property('name');
  expect(object).to.have.a.property('cnpj');
  expect(object).to.have.a.property('created_by');
  expect(object).to.have.a.property('created_at');
  expect(object).to.have.a.property('updated_at');
};

const shouldBehaveLikeAnAdministrators = (object) => {
  expect(object).to.be.an('Array');
  expect(object).to.be.lengthOf.above(0);
  expect(object[0]).to.have.a.property('id');
  expect(object[0]).to.have.a.property('name');
  expect(object[0]).to.have.a.property('cnpj');
  expect(object[0]).to.have.a.property('created_by');
  expect(object[0]).to.have.a.property('created_at');
  expect(object[0]).to.have.a.property('updated_at');
};

module.exports = {
  shouldBehaveLikeAnAdministrator,
  shouldBehaveLikeAnAdministrators,
};
