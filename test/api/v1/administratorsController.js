/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { houstonClientErrors } = require('houston-errors');
const { shouldBehaveLikeAPaginate } = require('../../support/shared_examples/shared.examples.for.paginate');
const { shouldBehaveLikeAnAdministrators, shouldBehaveLikeAnAdministrator } = require('../../support/shared_examples/shared.example.for.administrator');
const factory = require('../../factories/Administrators');
const { shouldBehaveLikeAnError } = require('../../support/shared_examples/shared.example.for.errors');

const logger = require('../../../config/logger');
const app = require('../../../app');

const { expect } = chai;
chai.use(chaiHttp);

const REQUEST_ROUTE = '/api/v1/administrators/';
let jwt = null;
let invalidAttrs;
let validAttrs;
let administrator;
const { UNPROCESSABLE_ENTITY } = houstonClientErrors;
const { userCredentials, bearer } = require('../../support/shared.constants');
// Disable ssl before tests.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Administrators Controller', () => {
  before(async () => {
    ({ dataValues: administrator } = await factory.create('Administrator'));
    ({ dataValues: invalidAttrs } = (await factory.build('Administrator')));
    invalidAttrs.active = null;
    ({ dataValues: validAttrs } = (await factory.build('Administrator')));
    delete validAttrs.id;
    const { body } = await chai.request(app)
      .post('/api/signin')
      .send(userCredentials);
    jwt = bearer + body.jwt;
  });
  after(async () => {
    describe('Removing an administrators', () => {
      it('should remove an administrators', async () => {
        const response = await chai.request(app)
          .delete(`${REQUEST_ROUTE}${administrator.id}`)
          .set('Authorization', jwt);
        if (response.error) logger.fatal(response.error);
        expect(response.error).to.be.eq(false);
        expect(response).to.have.status(204);
        await factory.cleanUp('Administrator');
      });
    });
  });

  describe(`Testing administrators controller in ${REQUEST_ROUTE}`, () => {
    it('Get administrators should have a list of administrators', async () => {
      const response = await chai.request(app).get(REQUEST_ROUTE).set('Authorization', jwt);
      expect(response).to.have.status(200);
      if (response.error) logger.fatal(response.error);
      expect(response.error).to.be.eq(false);
      shouldBehaveLikeAPaginate(response.body);
      shouldBehaveLikeAnAdministrators(response.body.data);
    });
    it('Create administrator should return an administrator registered', async () => {
      const response = await chai
        .request(app)
        .post(REQUEST_ROUTE)
        .set('Authorization', jwt)
        .send(validAttrs);
      if (response.error) logger.fatal(response.error.text);
      expect(response).to.have.status(200);
      expect(response.error).to.be.eq(false);
      shouldBehaveLikeAnAdministrator(response.body);
    });
    describe('Sending wrong parameters at', () => {
      it('create administrator without params, should return 406', async () => {
        const response = await chai
          .request(app)
          .post(REQUEST_ROUTE)
          .set('Authorization', jwt)
          .send({});
        logger.warn(response.error);
        shouldBehaveLikeAnError(response.body);
        expect(response).to.have.status(406);
      });
      it('Create administrator with wrong parameter should return 422', async () => {
        const response = await chai
          .request(app)
          .post(REQUEST_ROUTE)
          .set('Authorization', jwt)
          .send(invalidAttrs);
        shouldBehaveLikeAnError(response.body);
        logger.fatal(response.error);
        expect(response).to.have.status(UNPROCESSABLE_ENTITY.code);
      });
      it('Create administrator without one of required login parameter should return 406', async () => {
        delete invalidAttrs.login;
        const response = await chai
          .request(app)
          .post(REQUEST_ROUTE)
          .set('Authorization', jwt)
          .send(invalidAttrs);
        if (response.error) logger.fatal(response.error);
        shouldBehaveLikeAnError(response.body);
        expect(response).to.have.status(UNPROCESSABLE_ENTITY.code);
      });
    });
  });
  describe(`${REQUEST_ROUTE}:id`, () => {
    it('GET should return an administrator', async () => {
      const response = await chai.request(app)
        .get(`${REQUEST_ROUTE}${administrator.id}`)
        .set('Authorization', jwt);
      expect(response).to.have.status(200);
      shouldBehaveLikeAnAdministrator(response.body);
    });
    it('PATCH should update an administrator', async () => {
      const response = await chai.request(app)
        .patch(`${REQUEST_ROUTE}${administrator.id}`)
        .set('Authorization', jwt)
        .send({ first_name: validAttrs.first_name });
      expect(response).to.have.status(200);
      shouldBehaveLikeAnAdministrator(response.body);
    });
  });
});
