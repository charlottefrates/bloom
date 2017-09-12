import React from 'react';
import { shallow } from 'enzyme';
import 'babel-polyfill';

global.React = React;

const App = require('./app');


describe('<App />', () => {

  let wrapper, windowClearMethod;

  beforeAll(() => {
    windowClearMethod = window.clear;
  });

  afterAll(() => {
    window.localStorage.clear = windowClearMethod;
  });

  beforeEach(() => {
    window.localStorage.setItem('version', 'a-fake-version');
    window.localStorage.clear = jest.fn();
    wrapper = shallow(<App />);
  });

  it('should clear localStorage', () => {
    expect(window.localStorage.clear.mock.calls.length).toBe(1);
  });

  it('should be able to run tests', () => {
     expect(1 + 2).toEqual(3);
  });

});
