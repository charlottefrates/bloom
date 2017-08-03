import React from 'react';
import Plot from '../containers/plot';

import axios from 'axios';

/*Functional Component using ES6 class to define component*/

export default class WeatherForcast extends React.Component{

    constructor(props) {
    super(props);
    this.state = {location: '',
                  current_temp: '',
                  current_condition: '',
                  current_wind: '',
                  data:{ },
                  dates: [],
                  temps: [],
                  max:[],
                  min:[],
                  five_day_description: [],
                  five_day_wind:[],
                  selected: {
                    date: '',
                    temp: null
                  }
                };

    //handler binds so that mutable state is kept within the property
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.changeLocation.bind(this);
  }

    handleChange = (e) =>{
        e.preventDefault();
        e.currentTarget.reset();

        const location = encodeURIComponent(this.state.location);

        let key = '3229556f6b40c6492802319447e8181d';
        let key2 = '16feb82ad77fc7d5f39ac7507d74ffe4';

        //to change units
        let metric = 'metric';
        let imperial = 'imperial'

        const urlPrefixcurrent = 'http://api.openweathermap.org/data/2.5/weather?q='
        const urlPrefixfiveday = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        let urlSuffix = `&APPID=${key}&units=${imperial}`;
        let urlSuffix2 = `&APPID=${key2}&units=${imperial}`;
        const urlfiveday = urlPrefixfiveday + location + urlSuffix;
        const urlcurrent = urlPrefixcurrent + location + urlSuffix;

        let currentTemp = '';
        let currentCondition = '';
        let currentWind= '';

        //Axios - Promised based data fetching
        // automatically converts data in JSON

        //first request
        axios.get(urlcurrent)
          .then(response => {
                var currentTemperature = response.data.main.temp;
                var condition = response.data.weather[0].description;
                var wind = response.data.wind.speed;
                // saving this data so that this state can be captured
                // in second request
                currentTemp = currentTemperature;
                currentCondition = condition;
                currentWind = wind;

                console.log('The current temperature is',currentTemperature);
                console.log('The current condition is',condition);
                console.log('The wind is moving '+ wind + 'mph');
                this.setState({
                  current_temp:currentTemp,
                  current_condition:currentCondition,
                  current_wind:currentWind

                })

          })
          .catch(error => {
                  console.log('Error fetching and parsing data', error);
          });

        //second request
        axios.get(urlfiveday)
          .then(response => {
            console.log('The five day forcast report is',response);
              var list = response.data.list;
              var dates = [];
              var temps = [];
              var maxTemp = [];
              var minTemp = [];
              var descriptions = [];
              var wind = [];

              for (var i = 0; i < list.length; i++) {
                  dates.push(list[i].dt_txt);
                  temps.push(list[i].main.temp);
                  maxTemp.push(list[i].main.temp_max);
                  minTemp.push(list[i].main.temp_min);
                  descriptions.push(list[i].weather[0].main);
                  wind.push(list[i].wind.speed);
                }

                this.setState({
                  current_temp:currentTemp,
                  current_condition:currentCondition,
                  current_wind:currentWind,
                  data: response.data,
                  dates: dates,
                  temps: temps,
                  max:maxTemp,
                  min:minTemp,
                  five_day_description:descriptions,
                  five_day_wind:wind,
                  selected: {
                    date: '',
                    temp: null
                  }
                })

          })
          .catch(error => {
                  console.log('Error fetching and parsing data', error);
          });

          }


    //utility method to capture controlled text input
    //and sets the location state
    changeLocation = (e) =>{
        this.setState({location: e.target.value});
    }

    //Event HANDLER that captures temperature on click of specific date
    // and save it to state
    onPlotClick = (data) => {
    console.log(data);
    if (data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
    };


    render(){
        let fiveDayTemp = 'no location';
        if (this.state.data.list) {
          fiveDayTemp = this.state.data.list[0].main.temp;
        }

        let currentTemp = this.state.current_temp;
        let currentCondition = this.state.current_condition;
        let currentWind = this.state.current_wind;
        let max = this.state.max;
        let min = this.state.min;

        return (
            <div>
                {/*~~~~~ Weather Component Form captures location entry upon submit ~~~~~*/}

                <form className="wrappermain"onSubmit={this.handleChange}>
                  <label>I want to know the weather for
                    {/* controlled input for now */}
                    <input
                    placeholder={"State, Country"}
                    type="text"
                    value={this.state.location}
                    onChange={this.changeLocation}
                    />
                    <input className="butt"type="submit" value="Submit" />
                  </label>
                </form>

                {/*
                   Render the current temperature and the forecast if we have data
                   otherwise return null
                   Add ternary operator so that we only render the current temp
                   and forecast WHEN we have it

                */}

                {(this.state.data.list) ? (
                  <div className="wrapper">
                  {/* Render the current temperature if no specific date is selected*/}

                  <p className="temp-wrapper">
                    <span className="temp">
                    { currentTemp}
                    </span>
                    <span className="temp-symbol">°C</span>
                    <span className="temp-date2"> Current temperature </span>
                    <span className="temp-date3"> {currentCondition} </span>
                    <span className="temp-date4"> Wind: {currentWind} mph</span>
                  </p>

                  <br/>
                  <br/>
                  <br/>

                  <p className="temp-wrapper">
                    <span className="temp">
                      { this.state.selected.temp ? this.state.selected.temp : fiveDayTemp }
                    </span>
                    <span className="temp-symbol">°C</span>
                    <span className="temp-date">
                       { this.state.selected.temp ? this.state.selected.date : ''}
                    </span>
                  </p>


                  <Plot
                      xData={this.state.dates}
                      yData={this.state.temps}
                      yDataDes={this.state.five_day_description}
                      onPlotClick={this.onPlotClick}
                      type="scatter"
                      mode="line"
                  />

                  </div>
                  ) : null }

            </div>
    );
  }
}
