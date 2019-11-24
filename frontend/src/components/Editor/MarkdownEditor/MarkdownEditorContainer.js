import React from "react";
import PropTypes from "prop-types";
import Editor from "./Editor";
import MarkdownEditor from "./MarkdownEditor";
import "./MarkdownEditor.scss";

const classNames = require("classnames");

class MarkdownEditorContainer extends React.PureComponent {
  render() {
    const { editorState, handleEditorChange, preview, theme } = this.props;
    return (
      <div className="markdown-editor">
        <div
          className={classNames("editor-pane", {
            "editor-preview-mode": preview
          })}
        >
          <Editor
            value={editorState}
            onChange={handleEditorChange}
            theme={theme}
          />
        </div>
        {preview ? (
          <div className="result-pane">
            <MarkdownEditor
              className="result"
              skipHtml={false}
              escapeHtml={false}
              src={editorState}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

MarkdownEditorContainer.propTypes = {
  editorState: PropTypes.string,
  handleEditorChange: PropTypes.func.isRequired,
  preview: PropTypes.bool,
  theme: PropTypes.string
};

MarkdownEditorContainer.defaultProps = {
  editorState: "",
  preview: false,
  theme: "monokai"
};

export default MarkdownEditorContainer;
