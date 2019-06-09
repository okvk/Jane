import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { getArticleList } from "actions/articles";
import Article from "components/Article/Article";

class ArticleList extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleList());
  }

  render() {
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="articles-wrapper">
            {this.props.articleList.map(article => (
              <Article key={article.id} {...article} />
            ))}
          </div>
        </div>
      </Layout.Content>
    );
  }
}

function mapStateToProps(state) {
  const articleList = state.articles.articleList;
  return { articleList };
}
export default connect(mapStateToProps)(ArticleList);
