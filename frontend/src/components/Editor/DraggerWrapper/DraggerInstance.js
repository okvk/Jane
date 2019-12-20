import React from "react";
import PropTypes from "prop-types";
import { Upload } from "antd";

const { Dragger } = Upload;

const DraggerInstance = props => {
  return (
    <Dragger
      multiple={props.multiple}
      customRequest={props.customRequest}
      onChange={props.onChange}
      onRemove={props.onRemove}
      fileList={props.fileList}
      openFileDialogOnClick={props.openFileDialogOnClick}
      showUploadList={props.showUploadList}
      style={props.style}
    >
      {props.children}
    </Dragger>
  );
};

DraggerInstance.propTypes = {
  multiple: PropTypes.bool,
  customRequest: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  fileList: PropTypes.shape([]).isRequired,
  openFileDialogOnClick: PropTypes.bool,
  showUploadList: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
  style: PropTypes.shape({}),
  children: PropTypes.element.isRequired
};

DraggerInstance.defaultProps = {
  multiple: false,
  openFileDialogOnClick: false,
  showUploadList: false,
  style: {}
};

export default DraggerInstance;
