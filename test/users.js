process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Users = require('../models/users');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  before((done) => {
    app.start().then(() => {
      done();
    });
  });

  beforeEach((done) => { //Before each test we empty the database
    Users.remove({}, (err) => {
      console.log(err);
      done();
    });
  });
    /*
    * Test the /GET route
    */
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(app.server)
      .get('/users')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
      });
    });
  });
    /*
    * Test the /POST route
    */
  describe('/POST users', () => {
    it('it should POST a users', (done) => {
      let user = {
        name: "User Name",
        email: "user@example.com",
        password: "123456789"
      }
      chai.request(app.server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

  });

    /*
    * Test the /GET/:id route
    */
  describe('/GET/:id users', () => {
    it('it should GET a users by the given id', (done) => {
      let user = new Users({ name: "new user", email: "user@example.com", password: "123456789" });
      user.save((err, user) => {
        chai.request(app.server)
          .get('/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('_id').eql(user.id);
            done();
          });
      });
    });
  });

    /*
    * Test the /PATCH/:id route
    */
    describe('/PATCH/:id user', () => {
      it('it should UPDATE a todo given the id', (done) => {
        let user = new Users({ name: "new user", email: "user@example.com", password: "123456789" });
        user.save((err, user) => {
          chai.request(app.server)
          .patch('/users/' + user.id)
          .send({ name: "new user 2", email: "user2@example.com", password: "678456789" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.name.should.eql('new user 2');
            res.body.email.should.eql('user2@example.com');
            done();
          });
        });
      });
    });

    /*
    * Test the /DELETE/:id route
    */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a todo given the id', (done) => {
      let user = new Users({ name: "new user", email: "user@example.com", password: "123456789" });
      user.save((err, user) => {
        chai.request(app.server)
          .delete('/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok').eql(1);
            res.body.should.have.property('n').eql(1);
            done();
        });
      });
    });
  });

});