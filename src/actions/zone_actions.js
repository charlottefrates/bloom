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
