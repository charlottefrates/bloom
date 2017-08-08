import React from 'react';

import WeatherForcast from '../containers/weatherforcast';
import Zones from '../containers/zone';


export default function App() {

    return (
        <div>
            <h1>Bloom - Smart Watering Tracker</h1>
            <br/>
            <WeatherForcast />
            <Zones />
        </div>
    );
}
