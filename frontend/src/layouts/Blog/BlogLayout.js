import React from "react";
import { Layout } from "antd";
import BlogSidebar from "components/BlogSidebar/BlogSidebar";
import "./BlogLayout.scss";

const BlogLayout = props => {
  return (
    <Layout.Content style={{ padding: "0 50px" }}>
      <div className="blog-container">
        <div className="blog-left-pane">
          <BlogSidebar />
        </div>
        <div className="blog-right-pane">{props.children}</div>
      </div>
    </Layout.Content>
  );
};

export default BlogLayout;
