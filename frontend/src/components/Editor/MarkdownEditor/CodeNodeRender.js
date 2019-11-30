import React from "react";
import PropTypes from "prop-types";
import mermaid from "mermaid";
import CodeBlock from "./CodeHighlight";

class UMLRender extends React.PureComponent {
  componentDidMount() {
    mermaid.init({ noteMargin: 24 }, ".mermaid");
  }

  render() {
    const { value } = this.props;
    if (typeof value === "undefined") {
      return null;
    }
    if (
      value.match(/^sequenceDiagram/) ||
      value.match(/^graph/) ||
      value.match(/^pie/) ||
      value.match(/^classDiagram/) ||
      value.match(/^stateDiagram/) ||
      value.match(/^gantt/)
    ) {
      return <div className="mermaid">{value}</div>;
    }
    return <CodeBlock {...this.props} />;
  }
}

UMLRender.defaultProps = {
  language: ""
};

UMLRender.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

export default UMLRender;
