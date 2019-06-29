import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import "./index.scss";

const loadingScreen = document.querySelector(".loading-screen");
const showLoading = () => loadingScreen.classList.remove("loading-off");
const hideLoading = () => loadingScreen.classList.add("loading-off");

ReactDOM.render(
  <Provider store={store}>
    <App showLoading={showLoading} hideLoading={hideLoading} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
