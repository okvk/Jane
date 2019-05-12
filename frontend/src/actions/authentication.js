import store from "helpers/store";
import { push } from "react-router-redux";
import authRequest from "middleware/auth";

import {default as CS} from 'constants/userConstants';

function requestLogin(creds) {
  return {
    type: CS.LOGIN_REQUEST,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(data) {
  return dispatch => {
    dispatch({
      type: CS.LOGIN_SUCCESS,
      isAuthenticated: true,
      token: data.token,
      user: data.user
    });
    // Redirect to home page
    dispatch(() => store.dispatch(push("/")));
  };
}

export function loginUser(creds) {
  return dispatch => {
    dispatch(requestLogin(creds));
    return authRequest.login(creds).then(
      response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(receiveLogin(response));
      },
      err =>
        dispatch({
          type: CS.LOGIN_FAILURE,
          isAuthenticated: false,
          error: err
        })
    );
  };
}

function requestLogout() {
  return {
    type: CS.LOGOUT_REQUEST,
    isAuthenticated: false
  };
}

function receiveLogout() {
  return dispatch => {
    dispatch({
      type: CS.LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false
    });
    dispatch(() => store.dispatch(push("/login/")));
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    authRequest.logout().then(
      () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(receiveLogout());
      },
      err => console.log(err)
    );
  };
}
