
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
