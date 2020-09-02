import React, { Component } from "react";
import VditorPreview from "vditor/dist/method.min";
import PropTypes from "prop-types";

class Previewer extends Component {
  preview = () => {
    const { id, raw } = this.props;
    if (!raw) {
      return;
    }
    VditorPreview.preview(document.getElementById(id), raw, {
      anchor: true,
      speech: {
        enable: false
      }
    });
  };

  render() {
    this.preview();
    return <div id={this.props.id} />;
  }
}

Previewer.propTypes = {
  id: PropTypes.string,
  raw: PropTypes.string
};

Previewer.defaultProps = {
  id: "previewer",
  raw: ""
};

export default Previewer;
