import React from 'react';
import Plot from '../containers/plot';

import axios from 'axios';



/*Functional Component using ES6 class to define component*/

export default class WeatherForcast extends React.Component{

    constructor(props) {
    super(props);
    this.state = {location: '',
                  weather:{},
                  current_temp:'',
                  current_humidity: '',
                  current_wind:'',
                  current_high:'',
                  current_min: '',
                  current_condition:'',
                  dates: [],
                  maxtemps: [],
                  mintemps: [],
                  descriptions:[],
                  icons:[],
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
            let list = response.data.list;

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

              //weather icon from Map
              let weatherIcon = weatherIconsMap[list[i].weather[0].icon];


              //TODO: grab element and add class based on weatherIcon
              //let element =  document.getElementById('-icon');
              //console.log(element);

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



            this.setState({
                weather:response,
                dates: finalname,
                maxtemps: maxtemps,
                mintemps: mintemps,
                descriptions:descriptions,
                icons:icons
              });

              console.log(this.state);

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

                console.log('The current temperature is '+ currentTemperature + 'deg F');
                console.log('The current condition is',condition);
                console.log('The wind is moving '+ wind + 'mph');
                console.log('The humidty level is '+ humidity);
                console.log('The highest temperature is projected to be '+ maxtemp + ' deg F');
                console.log('The lowest temperature is projected to be '+ mintemp + ' deg F');

                // saving this data so that this state can be captured
                // in second request
                currentTemp = currentTemperature;
                currentCondition = condition;
                currentWind = wind;
                currentHumidity = humidity;
                currentMax = maxtemp;
                currentMin= mintemp;


                this.setState({
                  current_temp:currentTemp,
                  current_humidity:currentHumidity,
                  current_wind:currentWind,
                  current_high:currentMax,
                  current_min:currentMin,
                  current_condition:currentCondition

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

      let d = new Date();
      let n = d.toLocaleTimeString();

      let objToday = new Date(),
	     weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	      dayOfWeek = weekday[objToday.getDay()],
	       domEnder = function() { let a = objToday; if (/1/.test(parseInt((a + "").charAt(0))))
                return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	        dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	         months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	          curMonth = months[objToday.getMonth()],
	           curYear = objToday.getFullYear(),
	            curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
                 let today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;


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

                {(this.state.weather.data) ? (
                  <div className="wrapper">

                  <div className="container" id="wrapper">
                    <div className="container-fluid" id="current-weather">
                    <div className="row">

                    {/* <!-- Right panel --> */}
                    <div className="col-md-4 col-sm-5">
                      <h5><spam id="cityName">{this.state.weather.data.city.name}</spam>, <spam id="cityCode">{this.state.weather.data.city.country}</spam></h5>
                      <h6 id="localDate">{today}</h6>
                      <h5 id="localTime">{n}</h5>
                    </div>

                    {/* <!-- Center panel --> */}
                    <div className="col-md-5 col-sm-7 center_one" >
                      <div className="row">
                        <i className={this.state.icons[0]} id ="main-icon" ></i>
                        <div>
                          <spam id="mainTemperature">{this.state.current_temp}°F </spam>
                          <h6 id="tempDescription">{this.state.current_condition}</h6>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right panel -->*/}
                    <div className="col-xs-12 col-sm-12 col-md-3 row left_one" >
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Humidity: <spam id="humidity">{this.state.current_humidity}</spam>%</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Wind: <spam id="wind">{this.state.current_wind}</spam> m/s</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>High: <spam id="mainTempHot">{this.state.current_high}</spam>°</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Low: <spam id="mainTempLow">{this.state.current_min}</spam>°</h6>
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
                          <p id="forecast-day-1-name">{this.state.dates[1]}</p>
                          <div className="row">
                            <h5 id="forecast-day-1-main">{this.state.weather.data.list[1].temp.day}°</h5>
                            <i className={this.state.icons[1]} id="forecast-day-1-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-1-ht">hi {this.state.maxtemps[1]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-1-lt">lo {this.state.mintemps[1]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 2 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-2-name">{this.state.dates[2]}</p>
                          <div className="row">
                            <h5 id="forecast-day-2-main">{this.state.weather.data.list[2].temp.day}°</h5>
                            <i className={this.state.icons[2]} id="forecast-day-2-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-2-ht">hi {this.state.maxtemps[2]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-2-lt">lo {this.state.mintemps[2]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 3 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-3-name"> {this.state.dates[3]}</p>
                          <div className="row">
                            <h5 id="forecast-day-3-main">{this.state.weather.data.list[3].temp.day}°</h5>
                            <i className={this.state.icons[3]} id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.state.maxtemps[3]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.state.mintemps[3]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 4 -->*/}
                    <div className="col-md-3 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-4-name"> {this.state.dates[4]}</p>
                          <div className="row">
                            <h5 id="forecast-day-4-main">{this.state.weather.data.list[4].temp.day}°</h5>
                            <i className={this.state.icons[4]} id="forecast-day-4-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-4-ht">hi {this.state.maxtemps[4]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-4-lt">lo {this.state.mintemps[4]}</spam></p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <Plot
                  xData={this.state.dates}
                  yData={this.state.maxtemps}
                  yDataDes={this.state.descriptions}
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
