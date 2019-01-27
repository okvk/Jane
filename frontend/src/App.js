import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Home from "./pages/Home";

import "./App.less";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header />
          <Route exact path="/" component={Home} />
          <Footer />
        </Layout>
      </Router>
    );
  }
}

export default App;
