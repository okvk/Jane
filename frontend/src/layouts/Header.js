import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Menu, Layout} from "antd";
import { Link } from "react-router-dom";

import { MenuMarkup } from "components/MenuMarkup";
import { NavBar } from "components/NavBar";

import logo from "assets/logo.png";
import "./Header.scss";

const { SubMenu } = Menu;

const UserSection = props => [
  <Link to="/login" key="login">
    Sign in
  </Link>,
  <Menu key="user" mode="horizontal" onClick={() => {}}>
    <SubMenu
      title={
        <Fragment>
          <span style={{ color: "#999", marginRight: 4 }}>
            {/* <Trans>Hi,</Trans> */}
          </span>
          {/* <span>{username}</span> */}
          {/* <Avatar style={{ marginLeft: 8 }} src={avatar} /> */}
        </Fragment>
      }
    >
      <Menu.Item key="SignOut">{/* <Trans>Sign out</Trans> */}</Menu.Item>
    </SubMenu>
  </Menu>
];
const Header = ({ location }) => {
  return (
    <Layout.Header className="fixed">
      <NavBar
        activeLinkKey={location.pathname}
        menuMarkup={MenuMarkup}
        placement="bottomLeft"
      />
      <div className="logo">
        <img src={logo} alt="Logo Campfire" />
      </div>
      <div className="right-container">
        <UserSection />
      </div>
    </Layout.Header>
  );
};

export default withRouter(Header);
