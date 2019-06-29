import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";

import MenuMarkup from "components/MenuMarkup/MenuMarkup";
import NavBar from "components/NavBar/NavBar";
import UserSection from "components/User/UserSection";
import { logoutUser } from "redux/actions/authActions";

import logo from "assets/logo.png";
import "./Header.scss";

const Header = ({ location, dispatch, isAuthenticated }) => {
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
        {window.location.pathname === "/write" || !isAuthenticated ? null : (
          <Link to="/write">
            <Button type="primary" key="write">
              Write
            </Button>
          </Link>
        )}
        <UserSection onLogout={onLogout} />
      </div>
    </Layout.Header>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authentication;
  return { isAuthenticated };
};
export default withRouter(connect(mapStateToProps)(Header));
