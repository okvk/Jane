import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout, Button, Input, Switch, Select } from "antd";
import { connect } from "react-redux";
import { Editor, TagSelector, MarkdownEditor } from "components";
import {
  createArticle,
  getTagList,
  composeArticle,
  updateArticle
} from "redux/actions/articleActions";
import "./ArticleEdit.scss";

const ReactDOMServer = require("react-dom/server");

const { Option } = Select;

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
      preview: this.props.preview
    };
  }

  componentDidMount() {
    // Request tag list from api
    this.props.dispatch(getTagList());
  }

  toggleMarkdownPreview = () => {
    this.setState(prevState => ({ preview: !prevState.preview }));
  };

  handleEditorChange = evt => {
    this.props.dispatch(composeArticle({ editorState: evt.target.value }));
  };

  changeEditorState = editorState => {
    this.props.dispatch(composeArticle({ editorState }));
  };

  onTitleChange = event => {
    this.props.dispatch(composeArticle({ title: event.target.value }));
  };

  onTagSelected = values => {
    this.props.dispatch(composeArticle({ selectedTags: values }));
  };

  onArticleSubmit = () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <MarkdownEditor src={this.props.editorState} />
    );
    const data = {
      title: this.props.title,
      content: html,
      raw: this.props.editorState,
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

  changeTheme = theme => {
    this.setState({ theme });
  };

  render() {
    // For more them choice, view https://codemirror.net/demo/theme.html
    const themeList = ["default", "monokai", "idea", "eclipse"];
    const { tags, title, editorState, selectedTags } = this.props;
    const { preview, theme } = this.state;
    return (
      <Layout.Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div className="write-toolbar">
            <div className="write-auto-save">
              shady last modified at Yesterday 18:34
            </div>
            <div className="write-button">
              <div className="write-theme">
                <Select
                  defaultValue="monokai"
                  style={{ width: 120 }}
                  onChange={this.changeTheme}
                >
                  {themeList.map(item => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="write-preview">
                <Switch onChange={this.toggleMarkdownPreview} />
              </div>
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
                changeEditorState={this.changeEditorState}
                handleEditorChange={this.handleEditorChange}
                theme={theme}
                preview={preview}
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
  title: PropTypes.string,
  theme: PropTypes.string,
  preview: PropTypes.bool
};

Write.defaultProps = {
  selectedTags: [],
  editorState: "",
  title: "",
  theme: "",
  preview: false
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
