import React from "react";

const Article = props => (
  <div className="article-item">
    <div className="article-title">{props.title}</div>
    <div className="article-summary">{props.summary}</div>
    <div className="article-meta">
      <div className="article-time">{props.created}</div>
      <div className="article-tags">{props.tags.map(tag => tag.name)}</div>
    </div>
  </div>
);

export default Article;
