import React from "react";
import { Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import Separator from "components/Separator/Separator";
import { BASE_URL } from "configs/settings";
import Menu from "./Menu";
import "./BlogSidebar.scss";

const classNames = require("classnames");

const isActive = path => {
  // get the last part of pathname
  const pathname = window.location.pathname;
  return pathname.endsWith(path);
};
const MenuComponent = props => (
  <Button
    className={classNames("blog-menu-item", {
      "menu-active": isActive(props.path)
    })}
  >
    <Link to={`/${props.username}/${props.path}`}>{props.sidebarName}</Link>
  </Button>
);

const BlogSidebar = props => (
  <div className="blog-sidebar-wrapper">
    <div className="blog-user-section">
      <div className="blog-avatar">
        <Avatar
          className="blog-avatar-icon"
          // src={`${BASE_URL}/${props.avatar}`}
        />
      </div>
      <div className="blog-username">{props.username}</div>
      <div className="blog-motto">{props.motto}</div>
    </div>
    <Separator />
    <div className="blog-menu">
      {Menu.map(menu => (
        <MenuComponent
          key={menu.sidebarName}
          {...menu}
          username={props.username}
        />
      ))}
    </div>
  </div>
);

export default BlogSidebar;
