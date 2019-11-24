import React, { Component } from "react";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";

import history from "helpers/history";
import { Footer, Header } from "layouts";
import AppRoutes from "routes";

import "./App.module.scss";

class App extends Component {
  componentDidMount() {
    this.props.hideLoading();
  }

  render() {
    return (
      <Router history={history}>
        <Layout className="layout">
          <Header />
          <AppRoutes />
          <Footer />
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { alert } = state;
  return { alert };
};

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
