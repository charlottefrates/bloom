import React from 'react';

//React Router
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {IndexRoute} from 'react-router';

import { connect } from 'react-redux';

import {
    logoutUser
} from '../actions/authentication_actions';

import $ from 'jquery';

import Header from '../containers/header';

import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';
import History from '../containers/history';


class Instructions extends React.Component {


render(){
    return (

        <Router >
        <div className="hidden">

            <nav className="navigation-bar is-visible" data-nav-status="toggle">
                <div>
                 <ul className="ul nobox ">

                      <li className="brand2" onClick={() =>window.location.href = '/'}>
                       BLOOM
                      </li>
                      <li onClick={() =>window.location.href = '/bloom'} className="signin li small"> ← Go Back </li>

                  </ul>
                </div>
            </nav>

             <div className="container">

             <header>
              <div>
                <ul className="main-nav">
                  <h1 className="guide"> Quick Guide </h1>
                </ul>
               </div>
              </header>

              <div className="guideList">

                    <p>Add customized watering zones.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/watering_zone.png" className=""/>
                    <p>Search for current weather by entering a location of interest.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/weather.png" className=""/>
                    <p>Based on the weather, select the days you would like to water. </p>
                    <img src="https://bloom-water-tracker.herokuapp.com/day_selection.png" className=""/>
                    <p>Select the zone or zones you would like to water.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/zone_selection.png" className=""/>
                    <p>Add information on how many gallons of water you would like to use and how long you want to warer for.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/watering.png" className=""/>
                    <p>Calculate your projected water use.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/projection.png" className=""/>
                    <p>Save your projection for future refrences.</p>
                    <img src="https://bloom-water-tracker.herokuapp.com/history.png" className=""/>

              </div>


             </div>
             <img src="http://www.ciderboys.com/wp-content/uploads/2014/05/bg_2.png" className="fix"/>
        </div>
        </Router>

    );
}
}

const mapStateToProps = (state, props) => ({
     authenticated: state.authenticated
});



//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Instructions);
