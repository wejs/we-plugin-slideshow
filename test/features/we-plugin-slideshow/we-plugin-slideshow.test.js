const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs;

let http, we, agent;
let salvedUser, salvedUserPassword, authenticatedRequest;

describe('we-plugin-slideshow', function() {
  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();

    let userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {
        done(err);
      });
    })
  });

  describe('slideshow', function () {
    it ('POST /slideshow should create one slideshow');
    it ('GET /slideshow should find 2 slideshows');
    it ('GET /slideshow/:id should find 1 slideshow');
    it ('UPDATE /slideshow/:id should update 1 slideshow');
    it ('DELETE /slideshow/:id should delete 1 slideshow and its slides');
  });

  describe('slide', function () {
    it ('POST /slide should create one slide in slideshow');
    it ('POST /slide should return error if slideshowId not is set');
    it ('POST /slide should return error if slideshowId not is valid');

    it ('GET /slide should find 2 slides');
    it ('GET /slide/:id should find 1 slide');
    it ('UPDATE /slide/:id should update 1 slide');
    it ('DELETE /slide/:id should delete 1 slide');
  });
});