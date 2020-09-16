import React from "react";
import PropTypes from "prop-types";
import VditorWrapper from "./VditorWrapper/VditorWrapper";
import DraggerWrapper from "./DraggerWrapper";

const Editor = props => {
  return (
    <div id="editor-wrapper">
      {props.type === "markdown" ? (
        <DraggerWrapper {...props}>
          <VditorWrapper {...props} />
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
