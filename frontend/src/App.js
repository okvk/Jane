import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";

import AppRoutes from './routes';
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

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
            {AppRoutes}
          <Footer />
        </Layout>
      </Router>
    );
  }
}

export default App;
