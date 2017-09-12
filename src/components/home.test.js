import React from 'react';
import {shallow,mount} from 'enzyme';
import Home from './home';

//NOTE: add react-scripts test --env=jsdom to test in package.json instead of jest to reproduce referror localStorage undefined


describe('<Home />', () => {
    it('Renders without crashing', () => {
        shallow(<Home />);
    });
});
