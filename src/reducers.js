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
     zones:[],
     selectedDays:[],
     selectedOptions:[],
     rate:'',
     time: '',
     projectedUse:'',
     entries:[],
     error: '',
     authenticated: false
};


export default (state, action) => {

     state = state || initialState;

     switch(action.type){

          case 'PULL_WEATHER':
               state.location = action.location;
                    return {
                         ...state, location: action.location
                    };

          case 'SET_DATA':
               state.weather = action.weather;
                    console.log('SET_DATA')
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

          case 'CREATE_ZONE':
          return{
               ...state,
               zones:[...state.zones,{name:action.name,id:action.id,editing:false}]
          }

          case 'EDIT_ZONE':
          console.log(state);


          return {
               ...state,
               zones: state.zones.map((index) => {
                    if (index.id === action.id) {
                              index.editing = !index.editing;
                    }
                  return index;
               })
          };

          case 'SAVE_ZONE':
          console.log(state.zones);

          return {
               ...state,
               zones: state.zones.map((name,index) => {
                    console.log(name);
                    console.log(action);
                    console.log(index);
                    if (name.id === action.id) {
                         return{
                              name:action.name
                         }
                         }
                    return name;
               }),
          };

          case 'DELETE_ZONE':
          // filter creates a new array with all the elements that are not the id chosen
          const updatedZones = state.zones.filter(zone => zone.id !== action.id);
          console.log('The new state now has :',updatedZones);
          return  {
               ...state,
               zones:updatedZones
          };

          case 'CLEAR_SELECTED_DAYS':
          //clears selected zones upon projection save
          console.log('zones have been cleared', state.selectedDays)
          return {
               ...state,
               selectedDays:[ ]
          };


          case 'SELECT_DAYS':
          state.selectedDays = action.data;
          return{
               ...state,
               selectedDays:action.data
          };

          case 'SELECT_ZONE':
          state.selectedOptions = action.data;
          return{
               ...state,
               selectedOptions:action.data
          };

          case 'SET_TIME':
          //state.rate = action.gallon;
          state.time = action.min;
          console.log('You will be watering for ' + state.time + ' min');
          return{
               ...state,
               //rate:action.gallon,
               time:action.min
          };

          case 'SET_WATERING':
          state.rate = action.gal;
          console.log('gallon/min set to ' + state.rate);
          return{
               ...state,
               rate:action.gal,
          };

          case 'SET_PROJECTED':
          state.projectedUse = action.projected;
          console.log('SET_ARRAY');
          console.log(state.projectedUse);
               return{
                    ...state,
                    projectedUse: action.projected
               };

          case 'AUTH_USER':
           return { ...state, error: '', authenticated: true,user: action.user };

          case 'UNAUTH_USER':
           return { };

          case 'AUTH_ERROR':
          console.log(state);
          console.log(state.error);
           return { ...state, error: action.payload };

          case 'SAVE_ENTRY':
                state.entries = action.entries;
                     console.log('SAVE_ENTRY')
                     console.log(state.entries);
                     return{
                          ...state, entries: action.entries
                     };
          case 'FETCH_PROJECTIONS':
                 return { ...state, entries: action.payload.data };
          case 'DELETE_PROJECTION':
               // filter creates a new array with all the elements that are not the id chosen
               const updatedEnteries = state.entries.filter(projection => projection.id !== action.id);
               console.log('The new state now has :',updatedEnteries);
               return  {
                    ...state,
                    entries:updatedEnteries
               };


          default:
               return state;
     }

}
