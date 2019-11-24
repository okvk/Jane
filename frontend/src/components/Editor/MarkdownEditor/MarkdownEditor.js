import React from "react";
import toc from "remark-toc";
import PropTypes from "prop-types";
import CodeBlock from "./CodeBlock";
import MarkdownRender from "./MathRender";
import "./MarkdownEditor.scss";

const MarkdownEditor = props => {
  const { className, src, skipHtml, escapeHtml } = props;
  return (
    <MarkdownRender
      className={className}
      source={src}
      skipHtml={skipHtml}
      escapeHtml={escapeHtml}
      renderers={{ code: CodeBlock }}
      plugins={[toc]}
    />
  );
};

MarkdownEditor.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  skipHtml: PropTypes.bool,
  escapeHtml: PropTypes.bool
};

MarkdownEditor.defaultProps = {
  className: "result",
  src: "",
  skipHtml: true,
  escapeHtml: true
};
export default MarkdownEditor;
