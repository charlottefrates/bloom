import React from 'react';
import { NavLink,Route , withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './home';

import { connect } from 'react-redux';

import {
    logoutUser
} from '../actions/authentication_actions';




class Header extends React.Component {
    onLogout = () =>{
         alert('logging out');
         this.props.dispatch(logoutUser());
    //this.props.history.push('/signout');
    //window.location.href='/';
     //<Redirect push to="/signout"/>
    };


    render() {
      return (

        <header>
          <ul className="main-nav">
            <li> <NavLink to="/zone" >Watering Zones</NavLink> </li>
            <li> <NavLink to="/weather">Weather Analytics</NavLink> </li>
            <li> <NavLink to="/smart">Smart Projection</NavLink> </li>
            <li> <NavLink to="/history">History</NavLink> </li>
            <li onClick={this.onLogout} className="signout"> SignOut </li>

          </ul>
        </header>


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
