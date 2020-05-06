import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticle, composeArticle } from "redux/actions/articleActions";
import { ArticleEdit as AE } from "components";

class ArticleEdit extends Component {
  componentDidMount() {
    this.props
      .dispatch(getArticle(this.props.match.params.articleId))
      .then(() => {
        const { title, raw, tags, id } = this.props.article;
        this.props.dispatch(
          composeArticle({
            articleId: id,
            title,
            editorState: raw,
            selectedTags:
              tags &&
              tags.map(item => {
                return item.name;
              })
          })
        );
      });
  }

  render() {
    return <AE />;
  }
}

function mapStateToProps(state) {
  const article = state.articles.article;
  return { article };
}
export default connect(mapStateToProps)(ArticleEdit);
