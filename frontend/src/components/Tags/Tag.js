import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Icon } from "antd";

const Tag = props => (
  <div className="tag">
    <Icon type="tags" style={{ fontSize: "1.2em", opacity: 0.6 }} />
    <Link to={`/tags#${props.name}`} className="name">
      {props.name}
    </Link>
  </div>
);

export default Tag;
