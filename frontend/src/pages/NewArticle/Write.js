import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import "./Write.scss";
import Editor from "components/Editor/Editor";
import TagSelector from "components/TagSelector/TagSelector";
import getTagList from "actions/articles";

class Write extends Component {
  state = {
    selectedTags: []
  };

  componentDidMount() {
    // Request tag list from api
    this.props.dispatch(getTagList());
  }

  onTagSelected = values => {
    this.setState({ selectedTags: values });
  };

  render() {
    const { tags } = this.props;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="write-toolbar">
            <div className="write-auto-save">
              shady last modified at Yesterday 18:34
            </div>
            <div className="history">history</div>
            <div className="wrtie-publish">
              <button type="submit">Publish</button>
            </div>
          </div>
          <div className="wrtie-container">
            <div className="article-title">
              <h1>文章标题</h1>
            </div>
            <div className="article-tags">
              <TagSelector
                selectedItems={this.state.selectedTags}
                onChange={this.onTagSelected}
                tags={tags}
              />
            </div>
            <div className="article-editor">
              <Editor />
            </div>
          </div>
        </div>
      </Layout.Content>
    );
  }
}

function mapStateToProps(state) {
  const tags = state.articles.tags;
  return { tags };
}

export default connect(mapStateToProps)(Write);
