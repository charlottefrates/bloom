import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './app';

//require("jest-localstorage-mock");

//NOTE: To engablege this test make sure you change packa.json "test": "react-scripts test --env=jsdom",


describe('<App />',()=>{

   it('Renders without crashing', () => {
       shallow(<App />);
   });

   //it('should be able to run tests', () => {
  //    expect(1 + 2).toEqual(3);
   //});

})
