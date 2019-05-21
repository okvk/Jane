import CS from "constants/utilsConstants";

const utils = (state = {}, action) => {
  switch (action.type) {
    case CS.SHOW_NOTIFICATION:
      return state;
    default:
      return state;
  }
};

export default utils;
