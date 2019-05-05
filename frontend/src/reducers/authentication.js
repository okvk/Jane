import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST,
} from "constants/USER";

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  token: localStorage.getItem('token'),
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isAuthenticated: false,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        isAuthenticated: false,
      };
    case LOGOUT_REQUEST:
      return {};
    default:
      return state;
  }
}
