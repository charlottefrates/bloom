import React from 'react';
import {shallow,mount} from 'enzyme';

import App from './app';

//NOTE: add react-scripts test --env=jsdom to test in package.json instead of jest to reproduce referror localStorage undefined


describe('<App />', () => {
    xit('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });

    it('Renders without crashing', () => {
        shallow(<App />);
    });
});


/*
global.React = React;

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
    const wrapper = shallow(<App />);
  });

  it('should clear localStorage', () => {
    expect(window.localStorage.clear.mock.calls.length).toBe(1);
  });

  it('should be able to run tests', () => {
     expect(1 + 2).toEqual(3);
  });

});
*/
