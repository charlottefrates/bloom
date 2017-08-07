import React from 'react';
import {connect} from 'react-redux';
import {
     pull_weather,
     set_data,
     set_current,
     set_array
} from '../actions';

import Plot from '../containers/plot';

import axios from 'axios';



/*Functional Component using ES6 class to define component*/


class WeatherForcast extends React.Component{

    handleChange = (e) =>{
        e.preventDefault();
        e.currentTarget.reset();

        const location = encodeURIComponent(this.props.location);

        let key = '3229556f6b40c6492802319447e8181d';
        let key2 = '16feb82ad77fc7d5f39ac7507d74ffe4';

        //to change units
        let metric = 'metric';
        let imperial = 'imperial'

        const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
        const urlPrefixcurrent = 'http://api.openweathermap.org/data/2.5/weather?q='
        let urlSuffix = `&APPID=${key}&units=${imperial}`;
        let cnt = '&cnt=5'
        const url = urlPrefix + location + urlSuffix + cnt;
        const urlcurrent = urlPrefixcurrent + location + urlSuffix;

        //variables capturing current weather data from second API call
        let currentTemp = '';
        let currentCondition = '';
        let currentWind= '';
        let currentHumidity = '';
        let currentMax = '';
        let currentMin = '';

        // Maps the API's icons to the ones from https://erikflowers.github.io/weather-icons/
        let weatherIconsMap = {
          "01d": "wi-day-sunny",
          "01n": "wi-night-clear",
          "02d": "wi-day-cloudy",
          "02n": "wi-night-cloudy",
          "03d": "wi-cloud",
          "03n": "wi-cloud",
          "04d": "wi-cloudy",
          "04n": "wi-cloudy",
          "09d": "wi-showers",
          "09n": "wi-showers",
          "10d": "wi-day-hail",
          "10n": "wi-night-hail",
          "11d": "wi-thunderstorm",
          "11n": "wi-thunderstorm",
          "13d": "wi-snow",
          "13n": "wi-snow",
          "50d": "wi-fog",
          "50n": "wi-fog"
        };


        //Axios - Promised based data fetching
        // automatically converts data in JSON

        //first API call
        axios.get(url)
          .then(response => {
            //grabs response in a variable
            let list = response.data.list;

            //captures set_array
            let dates = [];
            //captures reformated dt
            let reformatdate = [ ];
            //captures day name of reformated dt
            let finalname = [];
            let maxtemps = [];
            let mintemps = [];
            let descriptions = [];
            let icons = [];


            function getFormattedDate(date){
              let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              return new Date(date * 1000).toLocaleDateString("en-US",options);
            }


            for (let i = 0; i < list.length; i++) {
              let maxarray = Math.round(list[i].temp.max);
              let minarray = Math.round(list[i].temp.min);

              //console.log(list[i].weather[0].icon)

              //weather icon from Map
              //Accesses Object Notation (weatherIconsMap) by bracket notation that contains icon code
              let weatherIcon = weatherIconsMap[list[i].weather[0].icon];

              // adds array to variables
              dates.push(list[i].dt);
              maxtemps.push(maxarray);
              mintemps.push(minarray);
              descriptions.push(list[i].weather[0].main);
              icons.push("wi " + weatherIcon);

               }

               //changes format of dates
               for (let i = 0; i < dates.length; i++) {
                    reformatdate.push(getFormattedDate(dates[i]));
                  }

                //show only day name

                for (var i = 0; i < reformatdate.length; i++) {
                  var change = reformatdate[i].substring(0,reformatdate[i].indexOf(','));
                  finalname.push(change);
                }

                this.props.dispatch(set_data(response));
                this.props.dispatch(set_array(finalname,maxtemps,mintemps,descriptions,icons));

              console.log(this.props.state);

          })
          .catch(error => {
                  console.log('Error fetching and parsing data', error);
          });

          //Second API call gets current
          axios.get(urlcurrent)
          .then(response => {
                let currentTemperature = Math.round(response.data.main.temp);
                let condition = response.data.weather[0].description;
                let wind = Math.round(response.data.wind.speed);
                let humidity = Math.round(response.data.main.humidity);
                let maxtemp =  Math.round(response.data.main.temp_max);
                let mintemp = Math.round(response.data.main.temp_min);

                // saving this data so that this state can be captured
                // in second request
                currentTemp = currentTemperature;
                currentCondition = condition;
                currentWind = wind;
                currentHumidity = humidity;
                currentMax = maxtemp;
                currentMin= mintemp;

                this.props.dispatch(set_current(currentTemp,currentHumidity,currentWind,currentMax,currentMin,currentCondition));

                console.log('The current temperature is '+ this.props.current_temp + ' deg F');
                console.log('The current condition is',this.props.current_condition);
                console.log('The wind is moving '+ this.props.current_wind + ' mph');
                console.log('The humidty level is '+ this.props.current_humidity);
                console.log('The highest temperature is projected to be '+ this.props.current_high + ' deg F');
                console.log('The lowest temperature is projected to be '+ this.props.current_min + ' deg F');


          })
          .catch(error => {
                  console.log('Error fetching and parsing data', error);
          });


    }





    //utility method to capture controlled text input
    //and sets the location state
    changeLocation = (e) =>{
        this.props.dispatch(pull_weather(e.target.value));
    }



    render(){

      let d = new Date();
      let n = d.toLocaleTimeString();
      let today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

      let objToday = new Date(),
	     weekday = new Array(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
	      dayOfWeek = weekday[objToday.getDay()],
	       domEnder = function() {
           let a = objToday; if (/1/.test(parseInt((a + "").charAt(0))))
                return "th"; a = parseInt((a + "").charAt(1)); return 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th" }(),
	        dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	         months = new Array(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
	          curMonth = months[objToday.getMonth()],
	           curYear = objToday.getFullYear();


        return (
            <div>
                {/*~~~~~ Weather Component Form captures location entry upon submit ~~~~~*/}

                <form className="wrappermain"onSubmit={this.handleChange}>
                  <label>I want to know the weather for
                    {/* controlled input for now */}
                    <input
                    placeholder={"State, Country"}
                    type="text"
                    value={this.props.location}
                    onChange={this.changeLocation}
                    />
                    <input className="butt"type="submit" value="Submit" />
                  </label>
                </form>

                {(this.props.weather) ? (
                  <div className="wrapper">

                  <div className="container" id="wrapper">
                    <div className="container-fluid" id="current-weather">
                    <div className="row">

                    {/* <!-- Right panel --> */}
                    <div className="col-md-4 col-sm-5">
                      <h5><spam id="cityName">{this.props.weather.data.city.name}</spam>, <spam id="cityCode">{this.props.weather.data.city.country}</spam></h5>
                      <h6 id="localDate">{today}</h6>
                      <h5 id="localTime">{n}</h5>
                    </div>

                    {/* <!-- Center panel --> */}
                    <div className="col-md-5 col-sm-7 center_one" >
                      <div className="row">
                        <i className={this.props.icons[0]} id ="main-icon" ></i>
                        <div>
                          <spam id="mainTemperature">{this.props.current_temp}°F </spam>
                          <h6 id="tempDescription">{this.props.current_condition}</h6>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right panel -->*/}
                    <div className="col-xs-12 col-sm-12 col-md-3 row left_one" >
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Humidity: <spam id="humidity">{this.props.current_humidity}</spam>%</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Wind: <spam id="wind">{this.props.current_wind}</spam> m/s</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>High: <spam id="mainTempHot">{this.props.current_high}</spam>°</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Low: <spam id="mainTempLow">{this.props.current_min}</spam>°</h6>
                        </div>
                      </div>
                    </div>

                  </div>


                {/* <!-- 4 days forecast -->*/}
                <div className="container-fluid">
                  <div className="row forcast_one">

                    {/*<!-- Day 1 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-1-name">{this.props.dates[1]}</p>
                          <div className="row">
                            <h5 id="forecast-day-1-main">{this.props.weather.data.list[1].temp.day}°</h5>
                            <i className={this.props.icons[1]} id="forecast-day-1-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-1-ht">hi {this.props.maxtemps[1]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-1-lt">lo {this.props.mintemps[1]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 2 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-2-name">{this.props.dates[2]}</p>
                          <div className="row">
                            <h5 id="forecast-day-2-main">{this.props.weather.data.list[2].temp.day}°</h5>
                            <i className={this.props.icons[2]} id="forecast-day-2-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-2-ht">hi {this.props.maxtemps[2]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-2-lt">lo {this.props.mintemps[2]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 3 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-3-name"> {this.props.dates[3]}</p>
                          <div className="row">
                            <h5 id="forecast-day-3-main">{this.props.weather.data.list[3].temp.day}°</h5>
                            <i className={this.props.icons[3]} id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.props.maxtemps[3]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.props.mintemps[3]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 4 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-4-name"> {this.props.dates[4]}</p>
                          <div className="row">
                            <h5 id="forecast-day-4-main">{this.props.weather.data.list[4].temp.day}°</h5>
                            <i className={this.props.icons[4]} id="forecast-day-4-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-4-ht">hi {this.props.maxtemps[4]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-4-lt">lo {this.props.mintemps[4]}</spam></p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <Plot
                  xData={this.props.dates}
                  yData={this.props.maxtemps}
                  yDataDes={this.props.descriptions}
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

const mapStateToProps = state => ({
     state
});

//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(WeatherForcast);
