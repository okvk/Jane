import { get, post } from "./http";

export default {
  getTagList() {
    return get("/articles/tags/");
  },
  createArticle(data) {
    return post("/articles/", data);
  },
  getArticle(articleId) {
    return get(`/articles/${articleId}/`);
  },
  getArticleList(username) {
    return get(`/articles/?username=${username}`);
  }
};
