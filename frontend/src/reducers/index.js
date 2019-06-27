import { combineReducers } from "redux";

import authentication from "./authentication";
import utils from "./utils";
import articles from "./articles";

const rootReducer = combineReducers({
  authentication,
  utils,
  articles
});

export default rootReducer;
