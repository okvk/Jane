import React, { Component } from "react";
import { Layout, Button, Input, Switch, Select } from "antd";
import { connect } from "react-redux";
import { Editor, TagSelector, MarkdownEditor } from "components";
import { createArticle, getTagList } from "redux/actions/articleActions";
import "./NewArticle.scss";

const ReactDOMServer = require("react-dom/server");

const { Option } = Select;

class Write extends Component {
  state = {
    selectedTags: [],
    editorState: "",
    title: "",
    theme: "default",
    preview: false
  };

  componentDidMount() {
    // Request tag list from api
    this.props.dispatch(getTagList());
  }

  toggleMarkdownPreview = () => {
    this.setState(prevState => ({ preview: !prevState.preview }));
  };

  handleEditorChange = evt => {
    this.setState({ editorState: evt.target.value });
  };

  changeEditorState = editorState => {
    this.setState({ editorState });
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onTagSelected = values => {
    this.setState({ selectedTags: values });
  };

  onArticleSubmit = () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <MarkdownEditor src={this.state.editorState} />
    );

    const data = {
      title: this.state.title,
      content: html,
      raw: this.state.editorState,
      is_published: true,
      tags_list: this.state.selectedTags.map(tag => tag.key)
    };
    this.props.dispatch(createArticle(data));
  };

  changeTheme = theme => {
    this.setState({ theme });
  };

  render() {
    // For more them choice, view https://codemirror.net/demo/theme.html
    const themeList = ["default", "monokai", "idea", "eclipse"];
    const { tags } = this.props;
    const { title, editorState, selectedTags, preview, theme } = this.state;
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

function mapStateToProps(state) {
  const tags = state.articles.tags;
  return { tags };
}

export default connect(mapStateToProps)(Write);
