import {
     PULL_WEATHER,
     SET_DATA,
     SET_CURRENT,
     SET_ARRAY,
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
     zones:[
     {name: 'Zone 1'},
     {name: 'Zone 2'},
     {name: 'Zone 3'},
     {name: "Zone 4"},
     {name: "Zone 5"}
          ]

};


export default (state, action) => {

     state = state || initialState;

     switch(action.type){

          case 'PULL_WEATHER':
               state.location = action.location;
                    //NOTE: passing in a new,empty object({}) as the 1st arg and the current state as second
                    // we create a carbon copy of the state
                    //can also use Object.assign( {} , state,{location: action.location}) instead of spread operator
                    return {
                         ...initialState, location: action.location
                    };

          case 'SET_DATA':
               state.weather = action.weather;
                    console.log(state.weather);
                    return{
                         ...state, weather: action.weather
                    };

          case 'SET_CURRENT':
               state.current_temp = action.c_temp;
               state.current_humidity = action.c_hum;
               state.current_wind = action.c_wind;
               state.current_high = action.c_high;
               state.current_min = action.c_min;
               state.current_condition = action.c_con;
                    console.log('SET_CURRENT');
                    console.log(state);
                    return{
                         ...state,
                         current_temp:action.c_temp,
                         current_humidity:action.c_hum,
                         current_wind:action.c_wind,
                         current_high:action.c_high,
                         current_min:action.c_min,
                         current_condition:action.c_con
                    };

          case 'SET_ARRAY':
               state.dates = action.dates;
               state.maxtemps = action.maxtemps;
               state.mintemps = action.mintemps;
               state.descriptions = action.descriptions;
               state.icons = action.icons;
               console.log('SET_ARRAY');
               console.log(state);
                    return{
                         ...state,
                         dates: action.dates,
                         maxtemps:action.maxtemps,
                         mintemps:action.mintemps,
                         descriptions:action.descriptions,
                         icons:action.icons,
                    };

          default:
               return state;
     }

}
