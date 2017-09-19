import React from 'react';

//React Router
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Header from '../containers/header';

import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';
import History from '../containers/history';


export default class Bloom extends React.Component {

render(){
    return (

        <Router >
        <div>
             <div className="container">
             <Header />
             <Route path="/zone" component={Zones} />
             <Route path="/weather" component={WeatherForecast} />
             <Route path="/smart" component={Smart} />
             <Route path="/history" component={History} />
             </div>
             <img src="http://www.ciderboys.com/wp-content/uploads/2014/05/bg_2.png" className="fix"/>
        </div>
        </Router>

    );
}
}
