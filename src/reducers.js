import {
     pull_weather,
     set_data,
     set_current,
     set_array
} from './actions';

const initialState = {
     location: '',
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


export default (state, action) => {

     state = state || initialState;

     switch(action.type){

          case 'pull_weather':
          state.location = action.location;
          //NOTE: passing in a new,empty object({}) as the 1st arg and the current state as second
          // we create a carbon copy of the state
          //can also use Object.assign( {} , state,{location: action.location}) instead of spread operator
          return {
               ...initialState, location: action.location
          };

          case 'set_data':
          state.weather = action.weather;
          return{
               ...initialState, weather: action.weather
          };

          case 'set_current':
          state.current_temp = action.current_temp;
          state.current_humidity = action.current_humidity;
          state.current_wind = action.current_wind;
          state.current_high = action.current_high;
          state.current_min = action.current_min;
          state.current_condition = action.current_condition;
          return{
               ...initialState,
               current_temp:action.current_temp,
               current_humidity:action.current_humidity,
               current_wind:action.current_wind,
               current_high:action.current_high,
               current_min:action.current_min,
               current_condition:action.current_condition
          };

          case 'set_array':
          state.dates = action.dates;
          state.maxtemps = action.maxtemps;
          state.mintemps = action.mintemps;
          state.descriptions = action.descriptions;
          state.icons = action.icons;
          return{
               ...initialState,
               dates: action.dates,
               maxtemps:action.mintemps,
               mintemps:action.mintemps,
               descriptions:action.descriptions,
               icons:action.icons,
          };

          default:
          return state;
     }

}
