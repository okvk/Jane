import axios from 'axios';
import { config } from 'config';

function getAxios() {
  const token = localStorage.getItem('token') || null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  return axios.create({
    headers,
    method: 'get',
    baseURL: config.BASE_URL,
    timeout: 60000,
    responseType: 'json',
    transformRequest: [
      function (data) {
        if (data instanceof FormData) return data;
        return JSON.stringify(data);
      },
    ],
  });
}

function processData(data) {
  return data;
}

function handleError(error, hideErr) {
  if (!hideErr && error.response) {
    const status = error.response.status;
    const msg = error.response.data.errors;
    if (status === config.httpCode.UNAUTHORIZED) {
      // store.dispatch(expireAuthentication('Authorization Expired', 'warning'));
      // store.dispatch(push('/auth/login'));
    } else if (status === config.httpCode.BADREQUEST) {
      throw msg;
    } else {
      throw msg;
    }
  }
}

export function post(url, data, hideErr = false) {
  return getAxios()
    .post(url, processData(data))
    .then(res => res.data)
    .catch((err) => {
      handleError(err, hideErr);
    });
}

export function get(url, data, hideErr = false) {
  return getAxios()
    .get(url, processData(data))
    .then(res => res.data)
    .catch((err) => {
      handleError(err, hideErr);
    });
}

export function put(url, data, hideErr = false) {
  return getAxios()
    .put(url, processData(data))
    .then(res => res.data)
    .catch((err) => {
      handleError(err, hideErr);
    });
}

export function del(url, hideErr = false) {
  return getAxios()
    .delete(url)
    .then(res => res.data)
    .catch((err) => {
      handleError(err, hideErr);
    });
}
