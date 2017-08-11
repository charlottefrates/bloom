import React from 'react';

import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';


export default function App() {

    return (
        <div>
            <h1>Bloom - Smart Water Tracker</h1>
            <h3>Set your watering zones, check the weather forcast, and see a projection of your water usage based on the forecast and your custom zones.</h3>
            <br/>
            <Zones />
            <br/>
            <WeatherForecast />
            <Smart />

        </div>
    );
}
