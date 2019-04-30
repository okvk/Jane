import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from "redux-logger";

import rootReducer from "../reducers";
import history from './history';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), thunkMiddleware, loggerMiddleware)
);

export default store;