import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Header() {

    return (

      <header>
        <ul className="main-nav">
          <li> <NavLink to="/zone">Watering Zones</NavLink> </li>
          <li> <NavLink to="/weather">Weather Analytics</NavLink> </li>
          <li> <NavLink to="/smart">Smart Projection</NavLink> </li>
          <li> <NavLink to="/history">History</NavLink> </li>
          <li> <NavLink exact to="/signout">SignOut</NavLink> </li>
        </ul>
      </header>


    );
};
