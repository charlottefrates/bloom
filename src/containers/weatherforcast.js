import React from 'react';
import Plot from '../containers/plot';

import axios from 'axios';

/*Functional Component using ES6 class to define component*/

export default class WeatherForcast extends React.Component{

    constructor(props) {
    super(props);
    this.state = {location: '',
                  weather:{},
                  dates: [],
                  maxtemps: [],
                  mintemps: [],
                  descriptions:[],
                  //selected: {
                //    date: '',
                //    temp: null
                //  }
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
        //const urlPrefixcurrent = 'http://api.openweathermap.org/data/2.5/weather?q='
        let urlSuffix = `&APPID=${key}&units=${imperial}`;
        let cnt = '&cnt=5'
        const url = urlPrefix + location + urlSuffix + cnt;
        //const urlcurrent = urlPrefixcurrent + location + urlSuffix;


        //Axios - Promised based data fetching
        // automatically converts data in JSON

        //first request
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


            function getFormattedDate(date){
              let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              return new Date(date * 1000).toLocaleDateString("en-US",options);
            }


            for (let i = 0; i < list.length; i++) {
                 dates.push(list[i].dt);
                 maxtemps.push(list[i].temp.max);
                 mintemps.push(list[i].temp.min);
                 descriptions.push(list[i].weather[0].main)
               }

               //changes format of dates
               for (let i = 0; i < dates.length; i++) {
                    reformatdate.push(getFormattedDate(dates[i]));
                  }

                //show only day name

                for (var i = 0; i < reformatdate.length; i++) {
                  var change = reformatdate[i].substring(0,reformatdate[i].indexOf(','));
                  finalname.push(change);
                  console.log(finalname);
                }



            this.setState({
                weather:response,
                dates: finalname,
                maxtemps: maxtemps,
                mintemps: mintemps,
                descriptions:descriptions
              });

              console.log(this.state);

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
	       domEnder = function() { let a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
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
                      <h5 id="localTime"></h5>
                    </div>

                    {/* <!-- Center panel --> */}
                    <div className="col-md-5 col-sm-7 center_one" >
                      <div className="row">
                        <i className="wi center_two" id ="main-icon" ></i>
                        <div>
                          <spam id="mainTemperature">{this.state.weather.data.list[0].temp.day}°F </spam>
                          <h6 id="tempDescription">{this.state.weather.data.list[0].weather[0].description}</h6>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Left panel -->*/}
                    <div className="col-xs-12 col-sm-12 col-md-3 row left_one" >
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Humidity: <spam id="humidity">{this.state.weather.data.list[0].humidity}</spam>%</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Wind: <spam id="wind">{this.state.weather.data.list[0].speed}</spam> m/s</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>High: <spam id="mainTempHot">{this.state.weather.data.list[0].temp.max}</spam>°</h6>
                        </div>
                        <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                          <h6>Low: <spam id="mainTempLow">{this.state.weather.data.list[0].temp.min}</spam>°</h6>
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
                            <i className="wi forecast-icon" id="forecast-day-1-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-1-ht">hi {this.state.weather.data.list[1].temp.max}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-1-lt">lo {this.state.weather.data.list[1].temp.min}</spam></p>
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
                            <i className="wi forecast-icon" id="forecast-day-2-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-2-ht">hi {this.state.weather.data.list[2].temp.max}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-2-lt">lo {this.state.weather.data.list[2].temp.min}</spam></p>
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
                            <i className="wi forecast-icon" id="forecast-day-3-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-3-ht">hi {this.state.weather.data.list[3].temp.max}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-3-lt">lo {this.state.weather.data.list[3].temp.min}</spam></p>
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
                            <i className="wi forecast-icon" id="forecast-day-4-icon"></i>
                          </div>
                        </div>
                        <div className="col-sm-4 forecast-min-low">
                          <p><spam className="high-temperature" id="forecast-day-4-ht">hi {this.state.weather.data.list[4].temp.max}</spam></p>
                          <p><spam className="low-temperature" id="forecast-day-4-lt">lo {this.state.weather.data.list[4].temp.min}</spam></p>
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
