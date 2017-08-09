//passes zone property to state
export const CREATE_ZONE = 'CREATE_ZONE';
export const create_zone = (name) =>({
     type:CREATE_ZONE,
     name
})

//passes new zone property change
//Question: how will this action know which index?
export const EDIT_ZONE = 'EDIT_ZONE';
export const edit_zone = (name,zoneindex) =>({
     type: EDIT_ZONE,
     name,
     zoneindex
})

//deletes zone properties
export const DELETE_ZONE = 'DELETE_ZONE';
export const delete_zone = () =>({
     type: DELETE_ZONE

})
