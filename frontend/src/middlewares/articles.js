import { get, post, del, put } from "./http";

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
  deleteArticle(articleId) {
    return del(`/articles/${articleId}/`);
  },
  updateArticle(articleId, data) {
    return put(`/articles/${articleId}/`, data);
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
