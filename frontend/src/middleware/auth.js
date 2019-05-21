import { post } from "./http";

export default {
  login(data) {
    return post("/accounts/login/", data);
  },
  logout() {
    return post("/accounts/logout/", {});
  },
  register(data) {
    return post("/accounts/register/", data);
  }
};
