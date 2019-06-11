import React from "react";
import { Icon } from "antd";
import { HashLink as Link } from "react-router-hash-link";
import "./Article.scss";
import Tag from "components/Tags/Tag";

const dateFormat = date => {
  const dateObj = new Date(Date.parse(date));
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-us", { month: "short" });
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
};

const Article = props => (
  <div className="article-item">
    <div className="article-title">
      <Link to={`/articles/${props.id}/`}>{props.title}</Link>
    </div>
    <hr className="article-line" />
    <div className="article-summary">{props.summary}</div>
    <div className="article-meta">
      <div className="article-time">
        <Icon type="clock-circle" className="article-clock" />
        {dateFormat(props.created)}
      </div>
      <div className="article-tags">
        {props.tags.map(tag => (
          <Tag {...tag} />
        ))}
      </div>
    </div>
  </div>
);

export default Article;
