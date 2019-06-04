import axios from "axios";
import store from "helpers/store";
import { config, networkError, authError } from "config";
import { push } from "react-router-redux";
import showNotification from "actions/utils";

function getAxios() {
  const token = localStorage.getItem("token") || null;
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  return axios.create({
    headers,
    method: "get",
    baseURL: config.BASE_URL,
    timeout: 60000,
    responseType: "json",
    transformRequest: [
      function(data) {
        if (data instanceof FormData) return data;
        return JSON.stringify(data);
      }
    ]
  });
}

function processData(data) {
  return data;
}

function handleError(error, hideErr) {
  if (!hideErr && error.response) {
    const status = error.response.status;
    console.log(status === 500);
    if (status === config.httpCode.INTERNAL_SERVER_ERROR) {
      store.dispatch(showNotification(networkError));
    } else {
      const msg = error.response.data.errors;
      if (status === config.httpCode.UNAUTHORIZED) {
        store.dispatch(showNotification(authError));
        localStorage.removeItem("token");
        store.dispatch(push("/login/"));
      } else if (status === config.httpCode.BADREQUEST) {
        store.dispatch(showNotification(networkError));
      } else {
        throw msg;
      }
    }
    throw error;
  }
}

export function post(url, data, hideErr = false) {
  return getAxios()
    .post(url, processData(data))
    .then(res => res.data)
    .catch(err => {
      handleError(err, hideErr);
    });
}

export function get(url, data, hideErr = false) {
  return getAxios()
    .get(url, processData(data))
    .then(res => res.data)
    .catch(err => {
      handleError(err, hideErr);
    });
}

export function put(url, data, hideErr = false) {
  return getAxios()
    .put(url, processData(data))
    .then(res => res.data)
    .catch(err => {
      handleError(err, hideErr);
    });
}

export function del(url, hideErr = false) {
  return getAxios()
    .delete(url)
    .then(res => res.data)
    .catch(err => {
      handleError(err, hideErr);
    });
}
