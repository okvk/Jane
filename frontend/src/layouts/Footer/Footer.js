import React from "react";

import { Layout } from "antd";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      CAMPFIRE ©{year} Powered by{" "}
      <a
        href="https://github.com/itechub/jane"
        rel="noopener noreferrer"
        target="_blank"
      >
        Jane
      </a>{" "}
      <a
        href="http://beian.miit.gov.cn/"
        rel="noopener noreferrer"
        target="_blank"
      >
        粤ICP备19067163号
      </a>
    </Layout.Footer>
  );
};

export default Footer;
