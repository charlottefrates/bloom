import React from 'react';
import {shallow,mount} from 'enzyme';
import Bloom from './bloom';

//NOTE: add react-scripts test --env=jsdom to test in package.json instead of jest to reproduce referror localStorage undefined


describe('<Bloom />', () => {
    it('Renders without crashing', () => {
        shallow(<Bloom />);
    });
});
