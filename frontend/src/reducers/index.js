import { combineReducers } from 'redux';

import authentication from './authentication';
import utils from './utils';

const rootReducer = combineReducers({
  authentication,
  utils,
});

export default rootReducer;
