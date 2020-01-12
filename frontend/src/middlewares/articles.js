import { get, post, del } from "./http";

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
  },
  uploadFile(data, config) {
    return post("/resources/", data, config);
  },
  deleteFile(fileId) {
    return del(`/resources/${fileId}`);
  }
};
