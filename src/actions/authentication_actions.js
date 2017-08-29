import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

export const API_URL = 'http://localhost:9000';


export const CREATE_NEW_USER_ERROR = 'CREATE_NEW_USER_ERROR';
export const createNewUserError = error => ({
               type: CREATE_NEW_USER_ERROR,
               error
             });

export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const createNewUserSuccess = user => ({
               type: CREATE_NEW_USER_SUCCESS,
               user
             });

export const SIGN_IN_USER_ERROR = 'SIGN_IN_USER_ERROR';
             export const signInUserError = error => ({
               type: SIGN_IN_USER_ERROR,
               error
             });

export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
             export const signInUserSuccess = user => ({
               type: SIGN_IN_USER_SUCCESS,
               user
             });


  export const signInUser = (username, password) => {
  	return dispatch => {
  		const url = `${API_URL}/signin`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(username, password)
      })
      .then(response => {
        if (!response.ok) {
          return response.json()
          .then(error => dispatch(signInUserError(error.message)));
        }
        return response.json()
        .then(user => {
          browserHistory.push('/bloom');
          dispatch(signInUserSuccess(user));
        });
      });
  	};
  };


export const createNewUser = user => {
  return dispatch => {
    const url = `${API_URL}/signup`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        return response.json()
        .then(error => dispatch(createNewUserError(error.message)));
      }
        return response.json()
        .then(user => {
          browserHistory.push('/bloom');
          dispatch(createNewUserSuccess(user));
        });
    });
  };
};



export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: CREATE_NEW_USER_ERROR });
    window.location.href = '/';
  }
  }
