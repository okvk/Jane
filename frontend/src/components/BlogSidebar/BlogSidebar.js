import React from "react";
import { Button, Avatar } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Separator from "components/Separator/Separator";
import Menu from "./Menu";
import "./BlogSidebar.scss";

const MenuComponent = props => (
  <Button className="blog-menu-item">
    <Link to={props.path}>{props.sidebarName} </Link>
  </Button>
);

const BlogSidebar = props => (
  <div className="blog-sidebar-wrapper">
    <div className="blog-user-section">
      <div className="blog-avatar">
        <Avatar className="blog-avatar-icon" src={props.user.avatar} />
      </div>
      <div className="blog-username">{props.user.username}</div>
      <div className="blog-motto">生命不息，折腾不止</div>
    </div>
    <Separator />
    <div className="blog-menu">
      {Menu.map(menu => (
        <MenuComponent {...menu} />
      ))}
    </div>
  </div>
);

const mapStateToProps = state => {
  const { user } = state.authentication;
  return { user };
};

export default connect(mapStateToProps)(BlogSidebar);
