import React from 'react';

import $ from 'jquery';


import {connect} from 'react-redux';

import {
     pull_weather,
     fetchData,
     fetchData2
} from '../actions/weather_actions';


import Plot from '../containers/plot';

import '../styles/weather-icons-master/css/weather-icons.css';



/*Functional Component using ES6 class to define component*/

class WeatherForecast extends React.Component{

    handleChange = (e) =>{

        e.preventDefault();
        e.currentTarget.reset();

        //API call to find current geolocation
        $.getJSON("https://ipapi.co/json/", function(position) {
            console.log('Your current location is: ',position.city +' ' + position.region + ' ' + position.country + ', ' + position.postal);
            console.log('"https://ipapi.co/json/" rendered: ',position);
        });

        const location = encodeURIComponent(this.props.location);

        let key = '3229556f6b40c6492802319447e8181d';
        //let key2 = '16feb82ad77fc7d5f39ac7507d74ffe4';

        //to change units
        let imperial = 'imperial'

        const urlPrefix = 'https://api.apixu.com/v1/forecast.json?key=150c61ea3ec54da6b5f201714171609&q=';
        const urlPrefixcurrent = 'https://api.apixu.com/v1/current.json?key=150c61ea3ec54da6b5f201714171609&q=';
        let days = '&days=7'
        const url = urlPrefix + location + days;
        const urlcurrent = urlPrefixcurrent + location;

        console.log(url);
        console.log(urlcurrent);

        //API call #1
        //gets 7 day forecast
        this.props.dispatch(fetchData(url));

        //API call #2
        //gets current data
        this.props.dispatch(fetchData2(urlcurrent));

    }


    //utility method to capture controlled text input
    //and sets the location state
    changeLocation = (e) =>{
        this.props.dispatch(pull_weather(e.target.value));
    }



    render(){

        let d = new Date();
        let n = d.toLocaleTimeString();

        let objToday = new Date(),
  	     weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  	      dayOfWeek = weekday[objToday.getDay()],
  	       domEnder = function() { let a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  	        dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  	         months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  	          curMonth = months[objToday.getMonth()],
  	           curYear = objToday.getFullYear(),

  	               curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
                   let today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;


        return (
             <div className="main-content">
            <div>
                {/*~~~~~ Weather Component Form captures location entry upon submit ~~~~~*/}

                <form className="wrappermain"onSubmit={this.handleChange}>
                  <label>I want to know the weather for
                    {/* controlled input for now */}
                    <input
                    placeholder={"City"}
                    type="text"
                    value={this.props.location}
                    onChange={this.changeLocation}
                    />
                    <input className="butt"type="submit" value="Submit" />
                  </label>
                </form>

                {(this.props.weather.data) ? (
                  <div className="wrapper">

                  <div className="container" id="wrapper">
                    <div className="container-fluid" id="current-weather">
                    <div className="row">

                    {/* <!-- Right panel --> */}
                    <div className="col-md-4 col-sm-5 change3">
                      <h5><spam id="cityName">{this.props.weather.data.location.name}</spam>, <spam id="cityCode">{this.props.weather.data.location.region}</spam></h5>
                      <h6 id="localDate">{today}</h6>
                      <h5 id="localTime"></h5>
                    </div>

                    {/* <!-- Center panel --> */}
                    <div className="col-md-5 col-sm-7 center_one change4" >
                      <div className="row">
                        <i className={this.props.icons[0]} id ="main-icon" ></i>
                        <div>
                          <spam id="mainTemperature">{this.props.current_temp}°F </spam>
                          <h6 id="tempDescription">{this.props.current_condition}</h6>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right panel -->*/}
                    <div className="col-xs-12 col-sm-12 col-md-4 row left_one" >
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Humidity: <spam id="humidity">{this.props.current_humidity}</spam>%</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Wind: <spam id="wind">{this.props.current_wind}</spam> m/s</h6>
                        </div>
                      </div>
                    </div>

                  </div>


                {/* <!-- 4 days forecast -->*/}
                <div className="container-fluid">
                  <div className="row forcast_one">

                    {/*<!-- Day 1 -->*/}
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-1-name">{this.props.dates[1]}</p>
                          <div className="row">
                            <h5 id="forecast-day-1-main">{this.props.weather.data.forecast.forecastday[1].day.avgtemp_f}°</h5>
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
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-2-name">{this.props.dates[2]}</p>
                          <div className="row">
                            <h5 id="forecast-day-2-main">{this.props.weather.data.forecast.forecastday[2].day.avgtemp_f}°</h5>
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
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-3-name"> {this.props.dates[3]}</p>
                          <div className="row">
                            <h5 id="forecast-day-3-main">{this.props.weather.data.forecast.forecastday[3].day.avgtemp_f}°</h5>
                            <i className={this.props.icons[3]} id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.props.maxtemps[3]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.props.mintemps[3]}</spam></p>
                        </div>
                      </div>
                    </div>
                    </div>

                    <div className="container-fluid change1">
                    <div className="row forcast_one change2">
                    {/*<!-- Day 4 -->*/}
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-4-name"> {this.props.dates[4]}</p>
                          <div className="row">
                            <h5 id="forecast-day-4-main">{this.props.weather.data.forecast.forecastday[4].day.avgtemp_f}°</h5>
                            <i className={this.props.icons[4]} id="forecast-day-4-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-4-ht">hi {this.props.maxtemps[4]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-4-lt">lo {this.props.mintemps[4]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 5 -->*/}
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-3-name"> {this.props.dates[5]}</p>
                          <div className="row">
                            <h5 id="forecast-day-3-main">{this.props.weather.data.forecast.forecastday[5].day.avgtemp_f}°</h5>
                            <i className={this.props.icons[5]} id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.props.maxtemps[5]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.props.mintemps[5]}</spam></p>
                        </div>
                      </div>
                    </div>

                    {/*<!-- Day 6 -->*/}
                    <div className="col-md-4 col-sm-6 day-weather-box">
                      <div className="col-sm-12 day-weather-inner-box">
                        <div className="col-sm-8 forecast-main">
                          <p id="forecast-day-3-name"> {this.props.dates[6]}</p>
                          <div className="row">
                            <h5 id="forecast-day-3-main">{this.props.weather.data.forecast.forecastday[6].day.avgtemp_f}°</h5>
                            <i className={this.props.icons[6]} id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.props.maxtemps[6]}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.props.mintemps[6]}</spam></p>
                        </div>
                      </div>
                    </div>

                    </div>


                  </div>
                </div>
              </div>

              <Plot
                  xData={this.props.dates}
                  yDataLow ={this.props.mintemps}
                  yData={this.props.maxtemps}
                  yDataDes={this.props.descriptions}
                  type="scatter"
                  mode="line"
                />

                  </div>
                  ) : null }


            </div>
            </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    location: state.location,
    weather: state.weather,
    current_temp:state.current_temp,
    current_humidity: state.current_humidity,
    current_wind:state.current_wind,
    current_high:state.current_high,
    current_min:state.current_min,
    current_condition:state.current_condition,
    dates:state.dates,
    maxtemps:state.maxtemps,
    mintemps:state.mintemps,
    descriptions:state.descriptions,
    icons:state.icons,
    zones: state.zones,
    authenticated: state.authenticated
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(WeatherForecast);
