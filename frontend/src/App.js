import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import RouteWrapper from "./components/RouteWrapper/RouteWrapper";

import { routes } from "./config";
import "./App.less";

class App extends Component {
  componentDidMount() {
    this.props.hideLoading();
  }

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header />
          {routes.map((route, i) => (
            <RouteWrapper key={i} {...route} />
          ))}
          <Footer />
        </Layout>
      </Router>
    );
  }
}

export default App;
