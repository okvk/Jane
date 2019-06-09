import CS from "constants/articlesConstants";

const initialState = {
  tags: [],
  article: {}
};
const articles = (state = initialState, action) => {
  switch (action.type) {
    case CS.GET_TAG_LIST:
      return Object.assign({}, state, {
        tags: action.tags
      });
    case CS.GET_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        article: action.article
      });
    default:
      return state;
  }
};

export default articles;
