import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";

class Home extends Component {
  render() {
    return (
      <Layout.Content style={{ padding: "0 50px", marginTop: "64px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          Content
        </div>
      </Layout.Content>
    );
  }
}

export default Home;
