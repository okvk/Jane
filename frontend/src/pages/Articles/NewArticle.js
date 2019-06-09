import React, { Component } from "react";
import { Layout, Button, Input } from "antd";
import { connect } from "react-redux";
import BraftEditor from "braft-editor";
import "./NewArticle.scss";
import Editor from "components/Editor/Editor";
import TagSelector from "components/TagSelector/TagSelector";
import { createArticle, getTagList } from "actions/articles";

class Write extends Component {
  state = {
    selectedTags: [],
    editorState: BraftEditor.createEditorState(),
    title: ""
  };

  componentDidMount() {
    // Request tag list from api
    this.props.dispatch(getTagList());
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onTagSelected = values => {
    this.setState({ selectedTags: values });
  };

  onArticleSubmit = () => {
    const data = {
      title: this.state.title,
      content: this.state.editorState.toHTML(),
      is_published: true,
      tags_list: this.state.selectedTags.map(tag => tag.key)
    };
    this.props.dispatch(createArticle(data));
  };

  render() {
    const { tags } = this.props;
    const { title, editorState, selectedTags } = this.state;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="write-toolbar">
            <div className="write-auto-save">
              shady last modified at Yesterday 18:34
            </div>
            <div className="write-button">
              <div className="wrtie-history">
                <Button type="primary" size="default">
                  历史
                </Button>
              </div>
              <div className="wrtie-publish">
                <Button
                  type="primary"
                  size="default"
                  disabled={!title}
                  onClick={this.onArticleSubmit}
                >
                  发布
                </Button>
              </div>
            </div>
          </div>
          <div className="wrtie-container">
            <div className="article-title">
              <Input
                className="article-title-input"
                value={title}
                placeholder="请输入标题"
                onChange={this.onTitleChange}
              />
            </div>
            <div className="article-tags">
              <TagSelector
                selectedItems={selectedTags}
                onChange={this.onTagSelected}
                tags={tags}
              />
            </div>
            <div className="article-editor">
              <Editor
                editorState={editorState}
                handleEditorChange={this.handleEditorChange}
                theme="Compact"
              />
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
