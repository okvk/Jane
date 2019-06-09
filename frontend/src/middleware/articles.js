import { get } from "./http";

export default {
  getTagList() {
    return get("/articles/tags/");
  }
};
