import React from "react";
import PropTypes from "prop-types";
import MarkdownEditorContainer from "./MarkdownEditor/MarkdownEditorContainer";

const Editor = props => (
  <div className="editor-wrapper">
    {props.type === "markdown" ? <MarkdownEditorContainer {...props} /> : null}
  </div>
);

Editor.propTypes = {
  type: PropTypes.string
};

Editor.defaultProps = {
  type: "markdown"
};

export default Editor;
