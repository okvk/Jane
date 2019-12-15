/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from "react";
import { Upload, message } from "antd";
import articlesRequest from "middlewares/articles";

const { Dragger } = Upload;
class DraggerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  onChange = info => {
    const { file, fileList } = info;
    if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully.`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    } else if (file.status === "removed") {
      message.success(`${file.name} file removed successfully.`);
    }
    this.setState({
      fileList: fileList.map(item => {
        if (item.uid === file.uid) {
          return file;
        }
        return item;
      })
    });
  };

  // Showing file dragging icon
  dragHandler = event => {
    event.dataTransfer.dropEffect = "copy";
  };

  onSuccess = (ret, file) => {
    const uploadedFile = {
      name: file.name,
      uid: file.uid,
      fileId: ret.id,
      percent: 100,
      status: "done",
      url: `media/${ret.upload}`
    };
    this.onChange({ file: uploadedFile, fileList: this.state.fileList });
  };

  onError = err => {
    console.log("onError", err);
  };

  onProgress = ({ percent }, file) => {
    const uploadingFile = {
      name: file.name,
      uid: file.uid,
      percent: parseInt(percent, 10),
      status: "uploading"
    };
    this.onChange({ file: uploadingFile, fileList: this.state.fileList });
  };

  customRequest = ({ file }) => {
    // construct form-data
    const formData = new FormData();
    formData.append("upload", file);
    if (file.name.endsWith("png") || file.name.endsWith("jpg")) {
      formData.append("filetype", "IMAGE");
    } else {
      formData.append("filetype", "ATTACHMENT");
    }
    articlesRequest
      .uploadFile(formData, {
        onUploadProgress: ({ total, loaded }) => {
          this.onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        }
      })
      .then(({ data: response }) => {
        this.onSuccess(response, file);
      })
      .catch(this.onError);
    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  };

  componentDidMount = () => {
    document.addEventListener("dragover", evt => this.dragHandler(evt));
  };

  componentWillUnmount = () => {
    document.removeEventListener("dragover", evt => this.dragHandler(evt));
  };

  onRemove = file => {
    console.log(file);
    articlesRequest
      .deleteFile(file.fileId)
      .then()
      .catch(this.onError);
  };

  render() {
    return (
      <Dragger
        multiple
        customRequest={this.customRequest}
        onChange={this.onChange}
        onRemove={this.onRemove}
        fileList={this.state.fileList}
        openFileDialogOnClick={false}
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          padding: "0px"
        }}
      >
        {this.props.children}
      </Dragger>
    );
  }
}

export default DraggerWrapper;
