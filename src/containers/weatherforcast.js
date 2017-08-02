import React from 'react';
import Plot from '../containers/plot';

import axios from 'axios';

/*Functional Component using ES6 class to define component*/

export default class WeatherForcast extends React.Component{

    constructor(props) {
    super(props);
    this.state = {location: '',
                  data:{ },
                  dates: [],
                  temps: [],
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
        //to change units
        let metric = 'metric';
        let imperial = 'imperial'

        const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        let urlSuffix = `&APPID=${key}&units=${imperial}`;
        const urlfiveday = urlPrefix + location + urlSuffix;


        //Axios - Promised based data fetching
        // automatically converts data in JSON
        axios.get(urlfiveday)
          .then(response => {
              var list = response.data.list;
              var dates = [];
              var temps = [];

              for (var i = 0; i < list.length; i++) {
                  dates.push(list[i].dt_txt);
                  temps.push(list[i].main.temp);
                }
              console.log(list);
              console.log(dates);
              console.log(temps);

                this.setState({
                  data: response.data,
                  dates: dates,
                  temps: temps,
                  selected: {
                    date: '',
                    temp: null
                  }
                })
          })
          .catch(error => {
                  console.log('Error fetching and parsing data', error);
          });


          console.log('fetch data', this.state.data);
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
        let currentTemp = 'no location';
        if (this.state.data.list) {
          currentTemp = this.state.data.list[0].main.temp;
        }
        return (
            <div>
                {/*
                Weather Component
                Form captures location entry upon submit
                */}
                <form className="wrapper"onSubmit={this.handleChange}>
                  <label>I want to see a 5 day weather forcast for
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
                  {/* Render the current temperature if no specific date is selected */}
                  <p className="temp-wrapper">
                    <p> Projected Temp </p>
                    <span className="temp">
                      { this.state.selected.temp ? this.state.selected.temp : currentTemp }
                    </span>
                    <span className="temp-symbol">°C</span>
                    <span className="temp-date">
                      { this.state.selected.temp ? this.state.selected.date : ''}
                    </span>
                  </p>

                  <h2>5 Day Forecast</h2>

                  <Plot
                      xData={this.state.dates}
                      yData={this.state.temps}
                      onPlotClick={this.onPlotClick}
                      type="scatter"
                  />
                  </div>
                  ) : null }

            </div>
    );
  }
}
