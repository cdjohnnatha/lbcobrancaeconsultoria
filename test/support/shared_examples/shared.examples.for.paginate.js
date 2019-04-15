const { expect } = require('chai');

const shouldBehaveLikeAPaginate = (object) => {
  expect(object).to.have.a.property('limit');
  expect(object).to.have.a.property('offset');
  expect(object).to.have.a.property('totalItems');
  expect(object).to.have.a.property('currentPage');
  expect(object).to.have.a.property('page');
  expect(object).to.have.a.property('data');
  expect(object.data).to.be.an('Array');
  expect(object.data).to.have.lengthOf.above(0);
};

module.exports = { shouldBehaveLikeAPaginate };
