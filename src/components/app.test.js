import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './app';



describe('<App />',()=>{
   it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
   });

   it('Renders without crashing', () => {
       shallow(<App />);
   });
})
