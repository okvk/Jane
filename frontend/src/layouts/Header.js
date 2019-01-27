import React from "react";
import { withRouter } from "react-router";
import { Layout } from "antd";

import MenuMarkup from "../components/MenuMarkup/MenuMarkup";
import NavBar from "../components/NavBar/NavBar";

import logo from "../assets/logo.png";
import "./Header.less";

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
      <div className="user-block">
        <div>user section</div>
      </div>
    </Layout.Header>
  );
};

export default withRouter(Header);
