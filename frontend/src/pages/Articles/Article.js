import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { getArticle } from "actions/articles";

class Article extends Component {
  componentDidMount() {
    this.props.dispatch(getArticle(this.props.match.params.articleId));
  }

  render() {
    const { article } = this.props;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="article">
            <h2>{article.title}</h2>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: article.content
              }}
            />
          </div>
        </div>
      </Layout.Content>
    );
  }
}

function mapStateToProps(state) {
  const article = state.articles.article;
  return { article };
}
export default connect(mapStateToProps)(Article);
