import React from "react";
import PropTypes from "prop-types";

import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";

import "./MarkdownEditor.scss";

const classNames = require("classnames");

class MarkdownEditorContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.vditor = null;
    this.state = {
      vditorReady: false
    };
  }

  componentDidMount() {
    const thisCPN = this;
    const vditor = new Vditor("vditor", {
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after() {
        thisCPN.setState({ vditorReady: true });
      }
    });
    thisCPN.vditor = vditor;
    this.props.setVditor(vditor);
  }

  componentDidUpdate() {
    const { editorState } = this.props;
    if (this.state.vditorReady) {
      this.vditor.setValue(editorState);
    }
  }

  render() {
    return (
      <div className="markdown-editor">
        <div className={classNames("editor-pane")}>
          <div id="vditor" />
        </div>
      </div>
    );
  }
}

MarkdownEditorContainer.propTypes = {
  editorState: PropTypes.string
};

MarkdownEditorContainer.defaultProps = {
  editorState: ""
};

export default MarkdownEditorContainer;
