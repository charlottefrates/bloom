import React from 'react';
import {shallow,mount} from 'enzyme';
import Bloom from './bloom';

//NOTE: add react-scripts test --env=jsdom to test in package.json instead of jest to reproduce referror localStorage undefined


xdescribe('<Bloom />', () => {
    xit('Renders without crashing', () => {
        shallow(<Bloom />);
    });
});
