import React from 'react';

//React Router
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Header from './header';

import Home from './home';
import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';




export default function Bloom() {

    return (

        <Router >
        <div className="container">
        <Header />
        <Route path="/zone" component={Zones} />
        <Route path="/weather" component={WeatherForecast} />
        <Route path="/smart" component={Smart} />
        <Route exact path="/signout" component={Home} />
        </div>
        </Router>

    );
}
