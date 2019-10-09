import { post, get } from "./http";

export default {
  login(data) {
    return post("/accounts/login/", data);
  },
  logout() {
    return post("/accounts/logout/", {});
  },
  register(data) {
    return post("/accounts/register/", data);
  },
  getUser(username) {
    return get(`/accounts/?username=${username}`);
  }
};
