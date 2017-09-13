//NOTE: To run this test type npm test

process.env.NODE_ENV = 'test';

const React          = require('react');
const chai           = require('chai');
const chaiHttp       = require('chai-http');
const faker          = require('faker');
const mongoose       = require('mongoose');


let {Bloom}          = require('../server/app/models/bloom');
const User           = require('../server/app/models/users');
const {app}          = require('../server/server');
let passport         = require('passport');
let req              = {user: {_id:'charlotte'}};


chai.use(chaiHttp);
// this makes the should syntax available throughout
// this module
const should = chai.should();
const expect = chai.expect;
const assert = require('assert');


function seedProjectedData() {
  console.info('seeding projected entry data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateProjections());
  }
  // this will return a promise
  return Bloom.insertMany(seedData);
};


function generateProjections() {
  return {
       zones: [faker.lorem.text(),faker.lorem.text(),faker.lorem.text()],
       days: [faker.lorem.text(),faker.lorem.text(),faker.lorem.text()],
       gal_min: faker.random.arrayElement(["one","two","three","four"]),
       min: faker.random.arrayElement(["one","two","three","four"]),
       projected: faker.random.arrayElement(["one","two","three","four"]),
       user: 'fakeuser',
       user_id: req.user._id,
       created: faker.date.past(),
};
}

function generateUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.random.word(),
    password: faker.random.alphaNumeric()
  }
};

describe('Empty test', function() {
  it('An empty test should run successfully', function() {
    assert.equal('A', 'A');
  });
});


describe('Passing tests', () => {
  it('test should pass', () => {
    expect(true).to.be.true;
  });
});


describe('POST and DELETE endpoints', function(){

  it('test should add a new projection', function(done) {
    const newProjection = generateProjections();
    //identifies additional response
    const expectedKeys = ['id'].concat(Object.keys(newProjection));
    chai.request(app)
      .post('/new/test')
      .send(newProjection)
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.all.keys(expectedKeys);
        res.body.id.should.not.be.null;
        res.body.zones.should.equal(newProjection.zones);
        res.body.days.should.equal(newProjection.days);
        res.body.gal_min.should.equal(newProjection.gal_min);
        res.body.min.should.equal(newProjection.min);
        res.body.projected.should.equal(newProjection.projected);
        res.body.user_id.should.equal(newProjection.user_id);

      });
      done();

  });

  it('test should error if POST missing expected values', function() {
     const badRequestData = {};
     chai.request(app)
       .post('/new/test')
       .send(badRequestData)
       .end(function(err, res) {
         res.should.have.status(400);
       })
     });

     it('test to see if it grabs all projections', function(done) {
     chai.request(app)
       .get('/all')
       .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         done();
       });
   });

   xit('test should delete a projected POST by id', function() {
       let projectionEntry;
         return Bloom
           .findOne()
           .exec()
           .then(function(_exp) {
             projectionEntry = _exp;
             console.log(_exp);
             return chai.request(app).delete(`/delete/test/${projectionEntry._id}`);
           })
           .then(function(res) {
             res.should.have.status(204);
             return Bloom.findById(projectionEntry.id).exec();
           })
           .then(function(_exp) {
             should.not.exist(_exp);
           });
       });


});
