import axios from 'axios';

//passes location property
export const PULL_WEATHER = 'PULL_WEATHER';
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
       "01d": "wi-Sunny",
       "01n": "wi-Clear",
       "02d": "wi-Partly cloudy",
       "03d": "wi-Overcast",
       "03n": "wi-Overcast",
       "04d": "wi-Cloudy",
       "04n": "wi-Cloudy",
       "09d": "wi-Patchy rain possible",
       "09n": "wi-Patchy light drizzle",
       "09n": "wi-Light drizzle",
       "09n": "wi-Freezing drizzle",
       "09n": "wi-Heavy freezing drizzle",
       "09n": "wi-Patchy light rain",
       "09n": "wi-Light rain",
       "09n": "wi-Moderate rain at times",
       "09n": "wi-Moderate rain",
       "09n": "wi-Heavy rain at times",
       "09n": "wi-Heavy rain",
       "09n": "wi-Light freezing rain",
       "09n": "wi-Moderate or heavy freezing rain",
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
         console.log('7 days forecast:',response);
         //grabs response in a variable
         let list = response.data.forecast.forecastday;

         //captures set_array
         let dates = [];
         let maxtemps = [];
         let mintemps = [];
         let descriptions = [];
         let icons = [];

         for (let i = 0; i < list.length; i++) {
           debugger;
            let maxarray = Math.round(list[i].day.maxtemp_f);
            let minarray = Math.round(list[i].day.mintemp_f);

            //weather icon from Map
            //Accesses Object Notation (weatherIconsMap) by bracket notation that contains icon code
            let weatherCondition = list[i].day.condition.text;
            let weatherIcon = weatherIconsMap[weatherCondition];

            // adds array to variables
            dates.push(list[i].date);
            maxtemps.push(maxarray);
            mintemps.push(minarray);
            descriptions.push(list[i].day.condition.text);
            icons.push("wi " + weatherIcon);

          }

            console.log(dates);
            console.log(maxtemps);
            console.log(mintemps);
            console.log(descriptions);


            //captures response to array
            dispatch(set_data(response));

            //Adds arrays to state.
            dispatch(set_array(dates,maxtemps,mintemps,descriptions,icons));

       })
       .catch(error => {
            alert('Something went wrong, please try again.')
       });

  }
}

//Current Weather API Call
export function fetchData2(url) {
  return function thunk(dispatch) {
    //Second API call gets current
         axios.get(url)
         .then(response => {
           console.log('Current weather analytics', response);

               let currentTemperature = Math.round(response.data.current.temp_f);
               let condition = response.data.current.condition.text;
               let wind = Math.round(response.data.current.wind_mph);
               let humidity = Math.round(response.data.current.precip_mm);
               //let maxtemp =  Math.round(response.data.current);
               //let mintemp = Math.round(response.data.main.temp_min);

               console.log('The current temperature is: '+ currentTemperature);
               console.log('It is: '+ condition + ' in ' + response.data.location.name + ',' + response.data.location.region);
               console.log('With a wind speed of: ' + wind + ' mph');
               console.log('And humidity levels of: '+ humidity);

               //NOTE: this.props.dispatch IS NOT NEEDED
               //adda data to state.current weather parameters
               //dispatch(set_current(currentTemperature,humidity,wind,maxtemp,mintemp,condition));


         })
         .catch(error => {
                 console.log('Error fetching and parsing data', error);
         });
  }
}
