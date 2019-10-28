import "braft-editor/dist/index.css";
import React from "react";
import PropTypes from "prop-types";
import BraftEditor from "braft-editor";
import Markdown from "braft-extensions/dist/markdown";

import PreviewHtml from "./PreviewHtml";

const options = {
  excludeControls: ["letter-spacing", "line-height", "font-size"]
};

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

    if (theme === "full") {
      options.excludeControls = [];
    }

    const extendControls = [
      {
        key: "custom-button",
        type: "button",
        text: "预览",
        onClick: this.preview
      }
    ];

    BraftEditor.use(Markdown(options));

    return (
      <div className="editor-wrapper">
        <BraftEditor
          // TODO: Using Throttle to improve performance
          onChange={editor => handleEditorChange(editor)}
          excludeControls={options.excludeControls}
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
