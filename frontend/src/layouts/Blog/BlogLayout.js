import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { getUser } from "redux/actions/articleActions";
import BlogSidebar from "components/BlogSidebar/BlogSidebar";
import "./BlogLayout.scss";

class BlogLayout extends Component {
  componentDidMount() {
    this.props.dispatch(getUser(this.props.username));
  }

  render() {
    const user = this.props.user;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div className="blog-container">
          <div className="blog-left-pane">
            <BlogSidebar {...user} />
          </div>
          <div className="blog-right-pane">{this.props.children}</div>
        </div>
      </Layout.Content>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.articles;
  return { user };
};

export default connect(mapStateToProps)(BlogLayout);
