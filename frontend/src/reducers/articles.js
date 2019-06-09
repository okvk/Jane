import CS from "constants/articlesConstants";

const initialState = {
  tags: [],
  article: {},
  articleList: []
};
const articles = (state = initialState, action) => {
  switch (action.type) {
    case CS.GET_TAG_LIST:
      return Object.assign({}, state, {
        tags: action.tags
      });
    case CS.RECEIVE_ARTICLE_INSTANCE:
      return Object.assign({}, state, {
        article: action.article
      });
    case CS.RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        articleList: action.articles
      });
    default:
      return state;
  }
};

export default articles;
