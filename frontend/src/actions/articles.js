import CS from "constants/articlesConstants";
import store from "helpers/store";
import { push } from "react-router-redux";
import articlesRequest from "middleware/articles";

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
        dispatch(() => store.dispatch(push(`/articles/${articleId}`)));
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
            type: CS.GET_ARTICLE_SUCCESS,
            article: response.data
          })
        );
      },
      err => console.log(err)
    );
}
