import React, { Component } from "react";
import { connect } from "react-redux";

import { getArticleList } from "@/redux/actions/articleActions";
import { BlogLayout } from "@/layouts";
import { Article } from "@/components";

class ArticleList extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleList(this.props.match.params.username));
  }

  render() {
    const username = this.props.match.params.username;
    return (
      <BlogLayout username={username}>
        <div className="articles-wrapper">
          {this.props.articleList.map(article => (
            <Article
              key={article.id}
              {...article}
              username={this.props.user.username}
            />
          ))}
        </div>
      </BlogLayout>
    );
  }
}

function mapStateToProps(state) {
  const { articleList, user } = state.articles;
  return { articleList, user };
}

export default connect(mapStateToProps)(ArticleList);
