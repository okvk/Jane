import TYPES from "redux/types/userTypes";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  token: localStorage.getItem("token")
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    case TYPES.LOGIN_FAILURE:
    case TYPES.LOGOUT_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
};
export default authentication;
