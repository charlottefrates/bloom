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
  axios.post(`${API_URL}/login`, { username, password })
    .then(response => {
        console.log(response);
        console.log('token:',response.data.token);
        console.log('user:',response.data.user);
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: 'AUTH_USER', user: response.data.user });
      //store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/
      //persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      // localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({token: response.data.token, _id: response.data.user._id}))
      //TODO: NOT WORKING!
      //this.context.router.history.push('/bloom');
      browserHistory.push('/bloom');
      //window.location.href = '/bloom';
    })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      //alert('Bad login info. Try again');
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
      //TODO: NOT WORKING!
      browserHistory.push('/bloom');
      //window.location.href = '/bloom';
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
    localStorage.removeItem('token');
    dispatch({ type: 'UNAUTH_USER' });
    //window.location.href = '/';
  }
  }
