import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

export const AUTH_USER = 'auth_user',
             UNAUTH_USER = 'unauth_user',
             AUTH_ERROR = 'auth_error',
             API_URL = 'http://localhost:9000';


export function loginUser({ username, password }) {
  return function(dispatch) {
  // Submit email/password to the sever
  axios.post(`${API_URL}/signin`, { username, password })
    .then(response => {
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER, user: response.data.user });
      browserHistory.push('/bloom');
    })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      dispatch(authError('Bad login info'));
    });
  }
  }

export function registerUser({ firstName,lastName,username,password }) {
  return function (dispatch) {
  axios.post(`${API_URL}/signup`, { firstName,lastName,username,password})
    .then(response => {
      dispatch({ type: AUTH_USER, user: response.data.user });
      browserHistory.push('/bloom');
    })
    .catch(response => dispatch(authError()));
}
  }


  export function authError(error) {
    return {
      type: AUTH_ERROR,
      payload: error
    }
  }

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    window.location.href = CLIENT_ROOT_URL + '/login';
  }
  }
