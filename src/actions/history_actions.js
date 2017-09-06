import axios from 'axios';

export const API_URL = 'http://localhost:9000',
             FETCH_PROJECTIONS = 'fetch_projections',
             DELETE_PROJECTION = 'delete_projections';

//passes full projection data response
export const SAVE_ENTRY = "SAVE_ENTRY";
export const save_entry = (projection) =>({
     type: SAVE_ENTRY,
     projection
});

export function saveProjection(entry) {
  return function(dispatch) {
  // Submit projection to the sever
  axios.post(`${API_URL}/new`, entry)
    .then(response => {
        console.log(response);
      //dispatch(set_data(response));
    })
    .catch(error => {
                 console.log('Error fetching and parsing data', error);
         });
  }
};

  export function fetchProjections() {
    return (dispatch, getState) => {
      //const id = getState().auth.user._id;
      const request = axios.get(`${API_URL}/all`);

      return dispatch({
        type: 'FETCH_PROJECTIONS',
        payload: request
      });
    }

  };

  export function deleteProjection(id) {
    return(dispatch) => {
      const request = axios.delete(`${API_URL}/delete/${id}`)
        .then(() => dispatch(projectionDeleted(id)))
    }

    const projectionDeleted = (id) => ({
      type: 'DELETE_PROJECTION', id
    })
  };
