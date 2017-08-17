import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink to="/zone">Watering Zones</NavLink></li>
      <li><NavLink to="/weather">Weather Analytics</NavLink></li>
      <li><NavLink to="/smart">Smart Projection</NavLink></li>
      <li><NavLink to="/history">History</NavLink></li>
    </ul>
  </header>
);

export default Header;
