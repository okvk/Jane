import { combineReducers } from "redux";

import authentication from "./authReducers";
import utils from "./utils";
import articles from "./articleReducers";

const rootReducer = combineReducers({
  authentication,
  utils,
  articles
});

export default rootReducer;
