import CS from "constants/userConstants";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  token: localStorage.getItem("token")
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case CS.LOGIN_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    case CS.LOGIN_FAILURE:
    case CS.LOGOUT_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
};
export default authentication;
