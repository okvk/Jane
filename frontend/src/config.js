export const BASE_URL = process.env.REACT_APP_JANE_API || 'http://localhost:8000';
export const config = {
  BASE_URL,
  httpCode: {
    SUCCESS: 200,
    NOFOUND: 404,
    UNAUTHORIZED: 401,
    BADREQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
  },
};
export const networkError = {
  type: 'error',
  title: 'Networks Connection Error',
  description: 'Opps, looks like network error occurs, please check your local'
   + 'network or ask help from the system admin',
};

export const authError = {
  type: 'warning',
  title: 'Authentication Expired',
  description: 'Opps, authentication expired, please try to login again',
};
