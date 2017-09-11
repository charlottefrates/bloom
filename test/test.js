//NOTE: To enable this test suite enable "test": "mocha"on package.json file

process.env.NODE_ENV = 'test';

require('testdom')('<html><body></body></html>');

const React          = require('react');
const chai           = require('chai');
const chaiHttp       = require('chai-http');
const faker          = require('faker');
const mongoose       = require('mongoose');
const ReactTestUtils = require('react-addons-test-utils');

chai.use(chaiHttp);

// this makes the should syntax available throughout
// this module
const should = chai.should();
const expect = chai.expect;
const assert = require('assert');


describe('Empty test', function() {
  it('An empty test should run successfully', function() {
    assert.equal('A', 'A');
  });
});


describe('Passing tests', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});
