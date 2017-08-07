
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
})
;

//passes current weather data
export const SET_CURRENT= "SET_CURRENT";

export const set_current = (current_temp,current_humidity,current_wind,current_high,current_min,current_condition) =>({
     type: SET_CURRENT,
     current_temp,
     current_humidity,
     current_wind,
     current_high,
     current_min,
     current_condition
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
