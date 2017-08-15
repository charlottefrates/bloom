import React from 'react';

import WeatherForecast from '../containers/weatherforcast';
import Zones from '../containers/zone';
import Smart from '../containers/smartwatering';


export default function App() {

    return (
        <div>
            <Zones />
            <br/>
            <WeatherForecast />
            <Smart />
        </div>
    );
}
