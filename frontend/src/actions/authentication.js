import store from 'helpers/store';
import { push } from 'react-router-redux';
import authRequest from 'middleware/auth';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
} from "constants/USER";

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isAuthenticated: false,
    creds,
  };
}

function receiveLogin(data) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      isAuthenticated: true,
      token: data.token,
      user: data.user,
    });
    console.log("Receive Login")
    dispatch(() => store.dispatch(push('/')));
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return authRequest.login(creds).then(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        dispatch(receiveLogin(response));
      },
      err => dispatch({
        type: LOGIN_FAILURE,
        isAuthenticated: false,
        error: err,
      }),

    );
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false,
    });
    // dispatch(() => store.dispatch(push('/auth/login')));
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    authRequest.logout().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(receiveLogout());
      },
      err => console.log(err),
    );
  };
}