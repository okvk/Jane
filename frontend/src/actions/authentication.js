import store from "helpers/store";
import { push } from "react-router-redux";
import authRequest from "middleware/auth";

import {default as CS} from 'constants/userConstants';

function receiveLogin(data) {
  return dispatch => {
    dispatch({
      type: CS.LOGIN_SUCCESS,
      isAuthenticated: true,
      user: data.user
    });
    // Redirect to home page
    dispatch(() => store.dispatch(push("/")));
  };
}

export function loginUser(creds) {
  return dispatch => {
    return authRequest.login(creds).then(
      response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(receiveLogin(response.data));
      },
      err =>
        dispatch({
          type: CS.LOGIN_FAILURE,
          isAuthenticated: false,
        })
    );
  };
}

function receiveLogout() {
  return dispatch => {
    dispatch({
      type: CS.LOGOUT_SUCCESS,
      isAuthenticated: false
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(() => store.dispatch(push("/login/")));
  };
}

export function logoutUser() {
  return dispatch => {
    authRequest.logout().then(
      () => {
        dispatch(receiveLogout());
      },
      err => console.log(err)
    );
  };
}
