import React from "react";
import PropTypes from "prop-types";
import CodeMirror from "./CodeMirror";

function Editor(props) {
  return (
    <form className="editor pure-form">
      <CodeMirror
        mode="markdown"
        readOnly={false}
        theme={props.theme}
        viewportMargin={Infinity}
        value={props.value}
        onChange={props.onChange}
      />
    </form>
  );
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  theme: PropTypes.string
};

Editor.defaultProps = {
  value: "",
  theme: "monokai"
};

export default Editor;
