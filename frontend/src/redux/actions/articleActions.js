import TYPES from "redux/types/articleTypes";
import store from "redux/store";
import { push } from "react-router-redux";
import authRequest from "middlewares/auth";
import articlesRequest from "middlewares/articles";

export function getUser(username) {
  return dispatch =>
    authRequest.getUser(username).then(
      response => {
        dispatch(() =>
          store.dispatch({
            type: TYPES.RECEIVE_USER,
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
        dispatch({ type: TYPES.GET_TAG_LIST, tags: response.data });
      },
      err => console.log(err)
    );
}

export function createArticle(data) {
  return dispatch =>
    articlesRequest.createArticle(data).then(
      response => {
        dispatch(() =>
          store.dispatch(
            push(`/${response.data.author}/articles/${response.data.id}`)
          )
        );
      },
      err => console.log(err)
    );
}
export function updateArticle(articleId, data) {
  return dispatch =>
    articlesRequest.updateArticle(articleId, data).then(
      response => {
        dispatch(() =>
          store.dispatch(
            push(`/${response.data.author}/articles/${response.data.id}`)
          )
        );
      },
      err => console.log(err)
    );
}

export function composeArticle(data) {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_ARTICLE_EDITOR,
      data
    });
  };
}

export function getArticle(articleId) {
  return dispatch =>
    articlesRequest.getArticle(articleId).then(
      response => {
        dispatch(() =>
          store.dispatch({
            type: TYPES.RECEIVE_ARTICLE_INSTANCE,
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
            type: TYPES.RECEIVE_ARTICLE_LIST,
            articles: response.data.records
          })
        );
      },
      err => console.log(err)
    );
}

export function deleteArticle(articleId, username) {
  return dispatch =>
    articlesRequest.deleteArticle(articleId).then(
      response => {
        dispatch(() => store.dispatch(getArticleList(username)));
      },
      err => console.log(err)
    );
}
