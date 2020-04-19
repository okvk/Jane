import React, { Component } from "react";
import { connect } from "react-redux";
import { ArticleEdit } from "components";
import { composeArticle } from "redux/actions/articleActions";

class NewArticle extends Component {
  componentDidMount() {
    this.props.dispatch(
      composeArticle({
        title: "",
        editorState: "",
        selectedTags: []
      })
    );
  }

  render() {
    return <ArticleEdit />;
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(NewArticle);
