import CS from "constants/articlesConstants";
import store from "helpers/store";
import { push } from "react-router-redux";
import authRequest from "middleware/auth";
import articlesRequest from "middleware/articles";

export function getUser(username) {
  return dispatch =>
    authRequest.getUser(username).then(
      response => {
        dispatch(() =>
          store.dispatch({
            type: CS.RECEIVE_USER,
            user: response.data
          })
        );
      },
      err => console.log(err)
    );
}

export function getTagList() {
  return dispatch =>
    articlesRequest.getTagList().then(
      response => {
        dispatch({ type: CS.GET_TAG_LIST, tags: response.data });
      },
      err => console.log(err)
    );
}

export function createArticle(data) {
  return dispatch =>
    articlesRequest.createArticle(data).then(
      response => {
        const articleId = response.data.id;
        dispatch(() =>
          store.dispatch(push(`/${response.data.author}/articles/${articleId}`))
        );
      },
      err => console.log(err)
    );
}

export function getArticle(articleId) {
  return dispatch =>
    articlesRequest.getArticle(articleId).then(
      response => {
        dispatch(() =>
          store.dispatch({
            type: CS.RECEIVE_ARTICLE_INSTANCE,
            article: response.data
          })
        );
      },
      err => console.log(err)
    );
}

export function getArticleList(username = null) {
  return dispatch =>
    articlesRequest.getArticleList(username).then(
      response => {
        dispatch(() =>
          store.dispatch({
            type: CS.RECEIVE_ARTICLE_LIST,
            articles: response.data.records
          })
        );
      },
      err => console.log(err)
    );
}
