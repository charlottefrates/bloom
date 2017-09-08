import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './app';

//require("jest-localstorage-mock");




describe('<App />',()=>{

   it('Renders without crashing', () => {
       shallow(<App />);
   });

   //xit('should be able to run tests', () => {
  //    expect(1 + 2).toEqual(3);
   //});

})
