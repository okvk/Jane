import React, { Component } from "react";

import { Layout } from "antd";

class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <Layout.Footer style={{ textAlign: "center" }}>
        CAMPFIRE ©{year} Powered by{" "}
        <a href="https://github.com/itechub/jane" rel="noopener noreferrer" target="_blank">
          Jane
        </a>
      </Layout.Footer>
    );
  }
}

export default Footer;
