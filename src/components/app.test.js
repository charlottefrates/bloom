import React from 'react';
import {shallow,mount} from 'enzyme';
import App from './app';

//NOTE: add react-scripts test --env=jsdom to test in package.json instead of jest to reproduce referror localStorage undefined


xdescribe('<App />', () => {
    xit('Renders without crashing', () => {
        shallow(<App />);
    });
});
