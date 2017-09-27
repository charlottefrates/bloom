import axios from 'axios';

//passes location property
export const PULL_WEATHER = 'PULL_WEATHER';
export const pull_weather = (location) =>({
     type:PULL_WEATHER,
     location
});

//passes full weather data response
export const SET_DATA = "SET_DATA";
export const set_data = (data) =>({
     type: SET_DATA,
     data
});

//passes current weather data
export const SET_CURRENT= "SET_CURRENT";
export const set_current = (c_temp,c_hum,c_wind,c_con) =>({
     type: SET_CURRENT,
     c_temp,
     c_hum,
     c_wind,
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
      "Sunny": "wi-day-sunny",
      "Clear": "wi-night-clear",
      "Partly cloudy": "wi-day-cloudy",
      "Cloudy": "wi-cloud",
      "Overcast": "wi-day-sunny-overcast",
      "Mist": "wi-day-haze",
      "Patchy rain possible":"wi-day-rain-mix",
      "Patchy snow possible": "wi-day-snow",
      "Patchy sleet possible":"wi-day-sleet",
      "Patchy freezing drizzle possible":"wi-day-rain",
      "Thundery outbreaks possible":"wi-day-lightning",
      "Blowing snow":"wi-day-snow-wind",
      "Blizzard":"wi-day-rain-wind",
      "Fog":"wi-day-fog",
      "Freezing fog":"wi-day-fog",
      "Patchy light drizzle":"wi-day-rain-mix",
      "Light drizzle":"wi-day-rain-mix",
      "Freezing drizzle":"wi-day-rain-mix",
      "Heavy freezing drizzle":"wi-day-hail",
      "Patchy light rain":"wi-day-hail",
      "Light rain":"wi-day-hail",
      "Moderate rain at times":"wi-day-hail",
      "Heavy rain at times":"wi-day-rain",
      "Heavy rain":"wi-day-rain",
      "Moderate rain":"wi-day-rain",
      "Light freezing rain":"wi-day-rain-mix",
      "Moderate or heavy freezing rain":"wi-day-rain-wind",
      "Light sleet":"wi-day-sleet",
      "Moderate or heavy sleet":"wi-day-sleet",
      "Patchy light snow":"wi-day-snow",
      "Light snow":"wi-day-snow",
      "Patchy moderate snow":"wi-day-snow",
      "Moderate snow":"wi-day-snow",
      "Patchy heavy snow":"wi-day-snow-wind",
      "Heavy snow":"wi-day-snow-wind",
      "Ice pellets":"wi-snowflake-cold",
      "Light rain shower":"wi-sprinkle",
      "Moderate or heavy rain shower":"wi-sprinkle",
      "Torrential rain shower":"wi-showers",
      "Light sleet showers":"wi-sleet",
      "Moderate or heavy sleet showers":"wi-day-sleet",
      "Light snow showers":"wi-day-snow-wind",
      "Moderate or heavy snow showers":"wi-snow",
      "Light showers of ice pellets":"wi-rain-mix",
      "Moderate or heavy showers of ice pellets":"wi-snowflake-cold",
      "Patchy light rain with thunder":"wi-storm-showers",
      "Moderate or heavy rain with thunder":"wi-thunderstorm",
      "Patchy light snow with thunder":"wi-storm-showers",
      "Moderate or heavy snow with thunder":"wi-storm-showers"
    };


    //Axios - Promised based data fetching
    // automatically converts data in JSON

    //first API call
    axios.get(url)
       .then(response => {

         console.log('7 days forecast:',response);

         let api_response = response;
         //grabs response in a variable
         let list = response.data.forecast.forecastday;

         //captures set_array
         let dates = [];
         let maxtemps = [];
         let mintemps = [];
         let descriptions = [];
         let icons = [];

         for (let i = 0; i < list.length; i++) {
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

            //Adds arrays to state.
            dispatch(set_array(dates,maxtemps,mintemps,descriptions,icons));
            //captures response to array
            dispatch(set_data(api_response));


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
               dispatch(set_current(currentTemperature,humidity,wind,condition));


         })
         .catch(error => {
                 console.log('Error fetching and parsing data', error);
         });
  }
}
