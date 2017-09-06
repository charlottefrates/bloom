import axios from 'axios';

export const API_URL = 'http://localhost:9000';

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
  }
