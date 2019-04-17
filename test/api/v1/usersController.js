/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { houstonClientErrors } = require('houston-errors');
const { shouldBehaveLikeAPaginate } = require('../../support/shared_examples/shared.examples.for.paginate');
const { shouldBehaveLikeAnUsers, shouldBehaveLikeAnUser } = require('../../support/shared_examples/shared.example.for.users');
const factory = require('../../factories/User');
const { shouldBehaveLikeAnError } = require('../../support/shared_examples/shared.example.for.errors');

const logger = require('../../../config/logger');
const app = require('../../../app');

const { expect } = chai;
chai.use(chaiHttp);

const USERS_ROUTE = '/api/v1/users/';
let jwt = null;
let invalidAttrs;
let validAttrs;
let user;
const { UNPROCESSABLE_ENTITY } = houstonClientErrors;
const { userCredentials, bearer } = require('../../support/shared.constants');
// Disable ssl before tests.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Users Controller', () => {
  before(async () => {
    ({ dataValues: user } = await factory.create('User'));
    ({ dataValues: invalidAttrs } = (await factory.build('User')));
    invalidAttrs.active = null;
    ({ dataValues: validAttrs } = (await factory.build('User')));
    const { body } = await chai.request(app)
      .post('/api/signin')
      .send(userCredentials);
    jwt = bearer + body.jwt;
  });
  after(async () => {
    describe('Removing an user', () => {
      it('should remove an user', async () => {
        const response = await chai.request(app)
          .delete(`${USERS_ROUTE}${user.id}`)
          .set('Authorization', jwt);
        if (response.error) logger.fatal(response.error);
        expect(response.error).to.be.eq(false);
        expect(response).to.have.status(204);
        await factory.cleanUp('User');
      });
    });
  });
  describe(`Testing users controller in ${USERS_ROUTE}`, () => {
    it('Get users should have a list of users', async () => {
      const response = await chai.request(app).get(USERS_ROUTE).set('Authorization', jwt);
      expect(response).to.have.status(200);
      if (response.error) logger.fatal(response.error);
      expect(response.error).to.be.eq(false);
      shouldBehaveLikeAPaginate(response.body);
      shouldBehaveLikeAnUsers(response.body.data);
    });
    it('Create user should return a user registered', async () => {
      const { dataValues: { id, ...params } } = await factory.build('User');
      const response = await chai
        .request(app)
        .post(USERS_ROUTE)
        .set('Authorization', jwt)
        .send(params);
      if (response.error) logger.fatal(response.error);
      expect(response.error).to.be.eq(false);
      expect(response).to.have.status(200);
      shouldBehaveLikeAnUser(response.body);
    });
    describe('Sending wrong parameters at', () => {
      it('create user without params, should return 406', async () => {
        const response = await chai
          .request(app)
          .post(USERS_ROUTE)
          .set('Authorization', jwt)
          .send({});
        logger.warn(response.error);
        shouldBehaveLikeAnError(response.body);
        expect(response).to.have.status(406);
      });
      it('Create user with wrong parameter should return 422', async () => {
        const response = await chai
          .request(app)
          .post(USERS_ROUTE)
          .set('Authorization', jwt)
          .send(invalidAttrs);
        // shouldBehaveLikeAnError(response.body);
        logger.fatal(response.error);
        expect(response).to.have.status(UNPROCESSABLE_ENTITY.code);
      });
      // it('Create user without one of required login parameter should return 406', async () => {
      //   delete invalidAttrs.login;
      //   const response = await chai
      //     .request(app)
      //     .post(USERS_ROUTE)
      //     .set('Authorization', jwt)
      //     .send(invalidAttrs);
      //   if (response.error) logger.fatal(response.error);
      //   shouldBehaveLikeAnError(response.body);
      //   expect(response).to.have.status(UNPROCESSABLE_ENTITY.code);
      // });
    });
  });
  describe(`${USERS_ROUTE}:id`, () => {
    it('GET should return an user', async () => {
      const response = await chai.request(app)
        .get(`${USERS_ROUTE}${user.id}`)
        .set('Authorization', jwt);
      expect(response).to.have.status(200);
      shouldBehaveLikeAnUser(response.body);
    });
    it('PATCH should update an user', async () => {
      const response = await chai.request(app)
        .patch(`${USERS_ROUTE}${user.id}`)
        .set('Authorization', jwt)
        .send({ first_name: validAttrs.first_name });
      expect(response).to.have.status(200);
      shouldBehaveLikeAnUser(response.body);
    });
  });
});
