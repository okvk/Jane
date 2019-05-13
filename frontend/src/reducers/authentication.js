import {default as CS} from 'constants/userConstants';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  token: localStorage.getItem('token'),
}

const authentication = (state = initialState, action) =>{
  switch (action.type) {
    case CS.LOGIN_REQUEST:
      return {
        isAuthenticated: false,
        user: action.user
      };
    case CS.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.user
      };
    case CS.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
      };
    case CS.LOGOUT_REQUEST:
      return {};
    default:
      return state;
  }
}
export default authentication;
