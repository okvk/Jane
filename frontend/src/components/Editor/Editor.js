import React from "react";
import PropTypes from "prop-types";
import MarkdownEditorContainer from "./MarkdownEditor/MarkdownEditorContainer";
import DraggerWrapper from "./DraggerWrapper";

const Editor = props => {
  return (
    <div id="editor-wrapper">
      {props.type === "markdown" ? (
        <DraggerWrapper {...props}>
          <MarkdownEditorContainer {...props} />
        </DraggerWrapper>
      ) : null}
    </div>
  );
};

Editor.propTypes = {
  type: PropTypes.string
};

Editor.defaultProps = {
  type: "markdown"
};

export default Editor;
