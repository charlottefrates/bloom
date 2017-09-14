import React from 'react';
import { NavLink} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';


import { connect } from 'react-redux';

import {
    logoutUser
} from '../actions/authentication_actions';

import $ from 'jquery';


class Header extends React.Component {

    componentDidMount() {

      $(".mobile-menu").on('click', function(){
		$(".mobile-dropdown").slideToggle("slow");
	});

    }

    onLogout = () =>{
         this.props.dispatch(logoutUser());
    };


    render() {
      return (
        <div>
        <header>
          <ul className="main-nav">
            <li> <NavLink to="/zone">Watering Zones</NavLink> </li>
            <li> <NavLink to="/weather">Weather Analytics</NavLink> </li>
            <li> <NavLink to="/smart">Smart Projection</NavLink> </li>
            <li> <NavLink to="/history">History</NavLink> </li>
            <li onClick={this.onLogout} className="signout"> SignOut </li>
          </ul>

          <div className="mobile-menu">
          <a className="dropdown-link">Menu</a>
          <ul className="mobile-dropdown">
            <li><NavLink to="/zone">Watering Zones</NavLink></li>
            <li><NavLink to="/weather">Weather Analytics</NavLink></li>
            <li><NavLink to="/smart">Smart Projection</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
            <li onClick={this.onLogout} className="signout">SignOut </li>
          </ul>
          </div>

        </header>
        </div>


      );
    }


};

const mapStateToProps = (state, props) => ({
     authenticated: state.authenticated
});



//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Header);
