import CS from "constants/articlesConstants";
import articlesRequest from "middleware/articles";

function getTagList() {
  return dispatch =>
    articlesRequest.getTagList().then(
      response => {
        dispatch({ type: CS.GET_TAG_LIST, tags: response.data });
      },
      err => console.log(err)
    );
}

export default getTagList;
