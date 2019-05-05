import { createStore, applyMiddleware, compose  } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from "redux-logger";

import rootReducer from "../reducers";
import history from './history';

const loggerMiddleware = createLogger();

const middleware =  applyMiddleware(routerMiddleware(history), thunkMiddleware, loggerMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
