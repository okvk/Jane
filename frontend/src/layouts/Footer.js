import React, { Component } from "react";

import { Layout } from "antd";

class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <Layout.Footer style={{ textAlign: "center" }}>
        Campfire ©{year} Powered by Jane
      </Layout.Footer>
    );
  }
}

export default Footer;
