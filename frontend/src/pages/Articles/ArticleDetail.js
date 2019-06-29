import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticle } from "redux/actions/articleActions";
import BlogLayout from "layouts/Blog/BlogLayout";
import "./ArticleDetail.scss";
import Separator from "components/Separator/Separator";
import Tag from "components/Tags/Tag";

class ArticlePage extends Component {
  componentDidMount() {
    this.props.dispatch(getArticle(this.props.match.params.articleId));
  }

  render() {
    const dateFormat = date => {
      const dateObj = new Date(Date.parse(date));
      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();
      return `${year}.${month}.${day}`;
    };

    const { article } = this.props;
    const username = this.props.match.params.username;
    return (
      <BlogLayout username={username}>
        <div className="article-detail">
          <h1 className="title">{article.title}</h1>
          <div className="meta">
            <span className="date">
              最后更新时间: {dateFormat(article.created)}
            </span>
            <span className="author">作者: {article.author}</span>
          </div>
          <Separator />
          <div
            className="content"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: article.content
            }}
          />
          <Separator />
          {article.tags &&
            article.tags.map(tag => <Tag {...tag} key={tag.name} />)}
        </div>
      </BlogLayout>
    );
  }
}

function mapStateToProps(state) {
  const article = state.articles.article;
  return { article };
}
export default connect(mapStateToProps)(ArticlePage);
