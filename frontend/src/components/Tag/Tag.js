import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { connect } from "react-redux";
import { Icon } from "antd";

import "./Tag.scss";

const Tag = props => (
  <div className="tag">
    <Icon type="tags" style={{ fontSize: "1.2em", opacity: 0.6 }} />
    <Link to={`/${props.user.username}/tags#${props.name}`} className="name">
      {props.name}
    </Link>
  </div>
);

const mapStateToProps = state => {
  const { user } = state.articles;
  return { user };
};

export default connect(mapStateToProps)(Tag);
