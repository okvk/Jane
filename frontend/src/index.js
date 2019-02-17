import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import "./index.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();

const loadingScreen = document.querySelector(".loading-screen");
const showLoading = () => loadingScreen.classList.remove("loading-off");
const hideLoading = () => loadingScreen.classList.add("loading-off");

ReactDOM.render(
  <Router history={history}>
    <App showLoading={showLoading} hideLoading={hideLoading} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
