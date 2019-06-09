import CS from "constants/articlesConstants";

const initialState = {
  tags: []
};
const articles = (state = initialState, action) => {
  switch (action.type) {
    case CS.GET_TAG_LIST:
      return {
        tags: action.tags
      };
    default:
      return state;
  }
};

export default articles;
