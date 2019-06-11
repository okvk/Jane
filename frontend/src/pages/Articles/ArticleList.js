import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticleList } from "actions/articles";
import BlogLayout from "layouts/Blog/BlogLayout";
import Article from "components/Article/Article";

class ArticleList extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleList());
  }

  render() {
    return (
      <BlogLayout>
        <div className="articles-wrapper">
          {this.props.articleList.map(article => (
            <Article key={article.id} {...article} />
          ))}
        </div>
      </BlogLayout>
    );
  }
}

function mapStateToProps(state) {
  const articleList = state.articles.articleList;
  return { articleList };
}
export default connect(mapStateToProps)(ArticleList);
