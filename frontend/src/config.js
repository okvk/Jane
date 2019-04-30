export const BASE_URL = process.env.REACT_APP_JANE_API || 'http://localhost:8000';
export const config = {
  BASE_URL,
  httpCode: {
    SUCCESS: 200,
    NOFOUND: 404,
    UNAUTHORIZED: 401,
    BADREQUEST: 400,
  },
};