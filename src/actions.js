import axios from 'axios';

export const PULL_WEATHER = 'PULL_WEATHER';

//passes location property
export const pull_weather = (location) =>({
     type:PULL_WEATHER,
     location
});

//passes full weather data response
export const SET_DATA = "SET_DATA";

export const set_data = (weather) =>({
     type: SET_DATA,
     weather
});

//passes current weather data
export const SET_CURRENT= "SET_CURRENT";

export const set_current = (c_temp,c_hum,c_wind,c_high,c_min,c_con) =>({
     type: SET_CURRENT,
     c_temp,
     c_hum,
     c_wind,
     c_high,
     c_min,
     c_con
});

//passes data arrays of 5 day forecast
export const SET_ARRAY = "SET_ARRAY";

export const set_array = (dates,maxtemps,mintemps,descriptions,icons) => ({
     type: SET_ARRAY,
     dates,
     maxtemps,
     mintemps,
     descriptions,
     icons
})

//7 day forecast API call
export function fetchData(url) {
  return function thunk(dispatch) {
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

            //NOTE: this.props.dispatch IS NOT NEEDED
            dispatch(set_data(response));
            dispatch(set_array(finalname,maxtemps,mintemps,descriptions,icons));


       })
       .catch(error => {
            alert('Something went wrong, please try again.')
              console.log('Error fetching and parsing data', error);
       });

  }
}

//Current Weather API Call
export function fetchData2(url) {
  return function thunk(dispatch) {
    //Second API call gets current
         axios.get(url)
         .then(response => {
               let currentTemperature = Math.round(response.data.main.temp);
               let condition = response.data.weather[0].description;
               let wind = Math.round(response.data.wind.speed);
               let humidity = Math.round(response.data.main.humidity);
               let maxtemp =  Math.round(response.data.main.temp_max);
               let mintemp = Math.round(response.data.main.temp_min);

               //NOTE: this.props.dispatch IS NOT NEEDED
               dispatch(set_current(currentTemperature,humidity,wind,maxtemp,mintemp,condition));


         })
         .catch(error => {
                 console.log('Error fetching and parsing data', error);
         });
  }
}
