import React from 'react';

//React Router
import {BrowserRouter as Router,Route} from 'react-router-dom';

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
import Instructions from '../containers/instructions';




class Bloom extends React.Component {

    onLogout = () =>{
         this.props.dispatch(logoutUser());
    };


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

                      <li onClick={this.onLogout} className="signin li small"> SignOut </li>
                      <li  onClick = {() =>window.location.href = '/instructions'} className="signup2 li" > Instructions </li>
                  </ul>
                </div>
            </nav>

             <div className="container">
             <Header />

             <Route exact path="/bloom" component={Zones}/>
             <Route path="/weather" component={WeatherForecast} />
             <Route path="/smart" component={Smart} />
             <Route path="/history" component={History} />
             <Route  path="/instructions" component={Instructions}/>
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
export default connect(mapStateToProps)(Bloom);
