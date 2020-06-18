import TYPES from "@/redux/types/utilsTypes";

const utils = (state = {}, action) => {
  switch (action.type) {
    case TYPES.SHOW_NOTIFICATION:
      return state;
    default:
      return state;
  }
};

export default utils;
