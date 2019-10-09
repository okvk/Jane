import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button } from "antd";
import { HashLink as Link } from "react-router-hash-link";
import "./Tags.scss";
import { getTagList, getArticleList } from "redux/actions/articleActions";
import { BlogLayout } from "layouts";
import { Separator } from "components";
import TagArticle from "./TagArticle";

class Tags extends Component {
  componentDidMount() {
    this.props.dispatch(getTagList());
    this.props.dispatch(getArticleList(this.props.match.params.username));
  }

  render() {
    const { articleList, tags } = this.props;

    tags.forEach(tag => {
      const tagArticles = [];
      articleList.forEach(article => {
        if (article.tags.map(item => item.id).includes(tag.id)) {
          tagArticles.push(article);
        }
      });
      // eslint-disable-next-line no-param-reassign
      tag.tagArticles = tagArticles;
    });

    const TagComponent = props => (
      <Link to={`#${props.name}`}>
        <Button className="item">
          <span className="name">{props.name}</span>
          <span className="count">{props.count}</span>
        </Button>
      </Link>
    );
    const username = this.props.match.params.username;
    return (
      <BlogLayout username={username}>
        <div className="tags-wrapper">
          <div className="tags-container">
            <div className="header">
              <Icon type="tags" style={{ fontSize: "1.2em", opacity: 0.6 }} />
              <span className="title">热门标签</span>
            </div>
            <Separator />
            <div className="list">
              {tags.map(tag => (
                <TagComponent
                  {...tag}
                  key={tag.name}
                  count={tag.tagArticles.length}
                />
              ))}
            </div>
          </div>
          <div className="tags-articles">
            {tags.map(tag => (
              <TagArticle {...tag} key={tag.name} />
            ))}
          </div>
        </div>
      </BlogLayout>
    );
  }
}

function mapStateToProps(state) {
  const { tags, articleList } = state.articles;
  return { tags, articleList };
}

export default connect(mapStateToProps)(Tags);
