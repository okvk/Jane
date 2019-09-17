import React from "react";
import { Icon } from "antd";
import { Separator } from "components";
import { Link } from "react-router-dom";
import "./Tags.scss";

const dateFormat = date => {
  const dateObj = new Date(Date.parse(date));
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("zh-cn", { month: "short" });
  const year = dateObj.getFullYear();
  return `${year}年 ${month}${day}日`;
};

const ArticleItem = props => (
  <div className="tag-article-item">
    <span className="dot" />
    <div className="date">{dateFormat(props.created)}</div>
    <Link to={`articles/${props.id}/`} className="title">
      {props.title}
    </Link>
  </div>
);

const TagArticle = props => (
  <div className="tag-article">
    <div className="tag-name jumptarget" id={props.name}>
      <Icon type="tags" style={{ fontSize: "1.2em", opacity: 0.6 }} />
      <span className="tags-title">{props.name}</span>
    </div>
    <div className="tag-article-list">
      {props.tagArticles.map(article => (
        <div key={article.id}>
          <Separator />
          <ArticleItem {...article} />
        </div>
      ))}
    </div>
  </div>
);
export default TagArticle;
