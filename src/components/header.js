import React from 'react';
import { NavLink,Route , withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './home';




class Header extends React.Component {
    onLogout = () =>{
    //this.props.history.push('/signout');
    window.location.href='/';
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

export default withRouter(Header);
