import React from 'react';

//React Router
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { NavLink} from 'react-router-dom';


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
                      <li onClick={() =>window.location.href = '/'} className="signin li small"> ← Main Page </li>

                  </ul>
                </div>
            </nav>

             <div className="container">
             <header>
              <div className="margin">
                <ul className="main-nav">
                  <li className="guide"> Instructions </li>
                </ul>
               </div>

                <div className="mobile-menu">
                <a onClick={() =>window.location.href = '/bloom'} className="dropdown-link">← Go Back </a>
                </div>

              </header>

              <div className="maincont2">
                 <div className="guideList">
                        <p className="move">Add customized watering zones.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/watering_zone.png"/>
                        <p className="move">Search for current weather by entering a location of interest.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/weather.png"/>
                        <p className="move">Based on the weather, select the days you would like to water. </p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/day_selection.png"/>
                        <p className="move">Select the zone or zones you would like to water.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/zone_selection.png"/>
                        <p className="move">Add information on how many gallons of water you would like to use and how long you want to water for.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/watering.png" />
                        <p className="move">Calculate your projected water use.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/projection.png"/>
                        <p className="move">Save your projection for future refrences.</p>
                        <img className="instImage" src="https://bloom-water-tracker.herokuapp.com/history.png"/>
                 </div>
              </div>

             </div>

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
