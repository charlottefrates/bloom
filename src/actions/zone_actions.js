// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

//passes zone property to state
export const CREATE_ZONE = 'CREATE_ZONE';
export const create_zone = (name,id) =>({
     type:CREATE_ZONE,
     name,
     id: uid()
});

//passes new zone property change
//Question: how will this action know which index?
export const SAVE_ZONE = 'SAVE_ZONE';
export const save_zone = (name,id) =>({
     type: SAVE_ZONE,
     name,
     id
});

export const EDIT_ZONE = "EDIT_ZONE";
export const edit_zone = (id) =>({
  type: EDIT_ZONE,
  id
});


//deletes zone properties
export const DELETE_ZONE = 'DELETE_ZONE';
export const delete_zone = (id) =>({
     type: DELETE_ZONE,
     id
});

//captures selected zones from projection component
export const SELECT_DAYS = 'SELECT_DAYS';
export const select_days = (data) =>({
     type:SELECT_DAYS,
     data
});

//clears select_days upon projection save to allow for new projections
export const CLEAR_SELECTED_DAYS = "CLEAR_SELECTED_DAYS";
export const clear_selected_days = ()=>({
     type: CLEAR_SELECTED_DAYS
})


//captures selected zones from projection component
export const SELECT_ZONE = 'SELECT_ZONE';
export const select_zone = (data) =>({
     type:SELECT_ZONE,
     data
});


//captures time of watering
export const SET_TIME= "SET_TIME";
export const set_time = (min) =>({
     type: SET_TIME,
     min
});

//captures amount of water
export const SET_WATERING= "SET_WATERING";
export const set_watering = (gal) =>({
     type: SET_WATERING,
     gal
});


//captures projected water use
export const SET_PROJECTED= "SET_PROJECTED";
export const set_projected = (projected) =>({
     type: SET_PROJECTED,
     projected
});
