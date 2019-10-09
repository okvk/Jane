import store from "redux/store";
import { push } from "react-router-redux";
import authRequest from "middlewares/auth";

import TYPES from "redux/types/userTypes";

function receiveLogin(data) {
  return dispatch => {
    dispatch({
      type: TYPES.LOGIN_SUCCESS,
      isAuthenticated: true,
      user: data.user
    });
    // Redirect to home page
    dispatch(() => store.dispatch(push("/")));
  };
}

export function loginUser(creds) {
  return dispatch =>
    authRequest.login(creds).then(
      response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(receiveLogin(response.data));
      },
      err =>
        dispatch({
          type: TYPES.LOGIN_FAILURE,
          isAuthenticated: false
        })
    );
}

function receiveLogout() {
  return dispatch => {
    dispatch({
      type: TYPES.LOGOUT_SUCCESS,
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
