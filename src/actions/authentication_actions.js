import axios from 'axios';
//import {browserHistory} from 'react-router';
import {browserHistory } from 'react-router';


export const AUTH_USER = 'auth_user',
             UNAUTH_USER = 'unauth_user',
             AUTH_ERROR = 'auth_error',
             API_URL ='https://bloom-water-tracker.herokuapp.com';//'https://bloom-water-tracker.herokuapp.com' or 'http://localhost:9000';


export function loginUser({ username, password }) {
  return function(dispatch) {
  // Submit email/password to the sever
  axios.post(`${API_URL}/login`, { username, password })
    .then(response => {
        console.log(response);
        console.log('token:',response.data.token);
        console.log('user:',response.data.user);
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: 'AUTH_USER', user: response.data.user });
      localStorage.setItem('accessToken', JSON.stringify({token: response.data.token}));
      localStorage.setItem('userId',JSON.stringify(response.data.user));
      browserHistory.push('/bloom');
      //window.location.href = '/bloom';
    })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      alert('Bad login info. Try again');
      dispatch(authError('Bad login info'));
    });
  }
  }

export function registerUser({ firstName,lastName,username,password }) {
  return function (dispatch) {
  axios.post(`${API_URL}/signup`, { firstName,lastName,username,password})
    .then(response => {
      console.log(response);
      dispatch({ type: 'AUTH_USER', user: response.data.user });
      localStorage.setItem('accessToken', JSON.stringify({token: response.data.token}));
      localStorage.setItem('userId',JSON.stringify(response.data.user));
      browserHistory.push('/signin');
    })
    .catch(response => {
      dispatch(authError());
    });
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
    localStorage.clear();
    dispatch({ type: 'UNAUTH_USER' });
    window.location.href = '/';
  }
  }
