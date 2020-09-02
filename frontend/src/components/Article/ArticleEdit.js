import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Button, Input } from "antd";
import { connect } from "react-redux";

import { Editor, TagSelector } from "@/components";
import {
  createArticle,
  getTagList,
  composeArticle,
  updateArticle
} from "@/redux/actions/articleActions";
import "./ArticleEdit.scss";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vditor: null
    };
  }

  componentDidMount() {
    // Request tag list from api
    this.props.dispatch(getTagList());
  }

  changeEditorState = editorState => {
    this.props.dispatch(composeArticle({ editorState }));
  };

  onTitleChange = event => {
    this.props.dispatch(composeArticle({ title: event.target.value }));
  };

  onTagSelected = values => {
    this.props.dispatch(composeArticle({ selectedTags: values }));
  };

  handleArticleSubmit = () => {
    const data = {
      title: this.props.title,
      content: this.state.vditor.getHTML(),
      raw: this.state.vditor.getValue(),
      is_published: true,
      tags_list: this.props.selectedTags
        .map(item => this.props.tags.find(o => o.name === item))
        .map(o => o.id)
    };
    if (this.props.articleId) {
      this.props.dispatch(updateArticle(this.props.articleId, data));
    } else {
      this.props.dispatch(createArticle(data));
    }
  };

  setVditor = vditor => {
    this.setState({ vditor });
  };

  render() {
    const { tags, title, editorState, selectedTags } = this.props;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="write-toolbar">
            <div className="write-auto-save">
              shady last modified at Yesterday 18:34
            </div>
            <div className="write-button">
              {/* <div className="wrtie-history">
                <Button type="primary" size="default">
                  历史
                </Button>
              </div> */}
              <div className="wrtie-publish">
                <Button
                  type="primary"
                  size="default"
                  disabled={!title}
                  onClick={this.handleArticleSubmit}
                >
                  Publish
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
                changeEditorState={this.changeEditorState}
                setVditor={this.setVditor}
              />
            </div>
          </div>
        </div>
      </Layout.Content>
    );
  }
}

Write.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string.isRequired),
  editorState: PropTypes.string,
  title: PropTypes.string
};

Write.defaultProps = {
  selectedTags: [],
  editorState: "",
  title: ""
};

function mapStateToProps(state) {
  const { tags } = state.articles;
  const {
    articleId,
    title,
    editorState,
    selectedTags
  } = state.articles.compose;
  return { tags, articleId, title, editorState, selectedTags };
}

export default connect(mapStateToProps)(Write);
