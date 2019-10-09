import "braft-editor/dist/index.css";
import React from "react";
import PropTypes from "prop-types";
import BraftEditor from "braft-editor";
import PreviewHtml from "./PreviewHtml";

class Editor extends React.Component {
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(
      PreviewHtml(this.props.editorState.toHTML())
    );
    window.previewWindow.document.close();
  };

  render() {
    const { theme, editorState, handleEditorChange } = this.props;
    let excludeControls = [
      "letter-spacing",
      "line-height",
      "clear",
      "headings",
      "list-ol",
      "list-ul",
      "remove-styles",
      "superscript",
      "subscript",
      "hr",
      "text-align"
    ];
    if (theme === "full") {
      excludeControls = [];
    }

    const extendControls = [
      {
        key: "custom-button",
        type: "button",
        text: "预览",
        onClick: this.preview
      }
    ];

    return (
      <div className="editor-wrapper">
        <BraftEditor
          // TODO: Using Throttle to improve performance
          onChange={editor => handleEditorChange(editor)}
          excludeControls={excludeControls}
          extendControls={extendControls}
          contentStyle={{ height: 800 }}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  theme: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  editorState: PropTypes.object.isRequired,
  handleEditorChange: PropTypes.func.isRequired
};

Editor.defaultProps = {
  theme: "full"
};

export default Editor;
