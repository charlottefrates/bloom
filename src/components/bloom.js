import React from 'react';

//React Router
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';
import Header from './header';



export default function Bloom() {

    return (

        <Router>
        <div className="container">
        <Header />
        <Route exact path="/zone" component={Zones} />
        <Route path="/weather" component={WeatherForecast} />
        <Route path="/smart" component={Smart} />

        </div>
        </Router>

    );
}
