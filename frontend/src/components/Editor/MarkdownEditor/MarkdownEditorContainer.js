import React from "react";
import PropTypes from "prop-types";

import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";

import MarkdownEditor from "./MarkdownEditor";
import "./MarkdownEditor.scss";

const classNames = require("classnames");

class MarkdownEditorContainer extends React.PureComponent {
  componentDidMount() {
    const vditor = new Vditor("vditor", {
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after() {
        vditor.setValue("");
      }
    });
  }

  render() {
    const { editorState, preview } = this.props;
    return (
      <div className="markdown-editor">
        <div
          className={classNames("editor-pane", {
            "editor-preview-mode": preview
          })}
        >
          <div id="vditor" />
          {/* <Editor
            value={editorState}
            onChange={handleEditorChange}
            theme={theme}
          /> */}
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
