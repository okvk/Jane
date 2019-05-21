import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Layout } from "antd";

import MenuMarkup from "components/MenuMarkup/MenuMarkup";
import NavBar from "components/NavBar/NavBar";
import UserSection from "components/User/UserSection";
import { logoutUser } from "actions/authentication";

import logo from "assets/logo.png";
import "./Header.scss";

const Header = ({ location, dispatch }) => {
  const onLogout = () => {
    dispatch(logoutUser());
  };
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
        <UserSection onLogout={onLogout} />
      </div>
    </Layout.Header>
  );
};

export default withRouter(connect()(Header));
