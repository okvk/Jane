/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from "react";
import { message } from "antd";
import { BASE_URL } from "configs/settings";
import articlesRequest from "middlewares/articles";
import DraggerInstance from "./DraggerInstance";
import UploadedFileList from "./UploadedFileList";
import "./DraggerWrapper.scss";

class DraggerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  onChange = info => {
    const { file, fileList } = info;
    this.setState({
      fileList: fileList.map(item => {
        if (item.uid === file.uid) {
          return file;
        }
        return item;
      })
    });

    if (file.status === "removed") {
      message.success(`${file.name} file removed successfully.`);
      this.setState({
        fileList: fileList.filter(item => item.uid !== file.uid)
      });
    } else if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully.`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  onSuccess = (ret, file, data = {}) => {
    const uploadedFile = {
      name: ret.filename,
      uid: data.uid || file.uid,
      fileId: ret.id,
      percent: 100,
      status: "done",
      url: `${BASE_URL}/media/${ret.upload}`
    };
    this.onChange({ file: uploadedFile, fileList: this.state.fileList });

    // Markdown syntax string: Auto generate for uploaded file inside editor
    const editorState = this.props.editorState.concat(
      this.getMarkdownText(uploadedFile)
    );
    this.props.changeEditorState(editorState);
  };

  onError = err => {
    console.log("onError", err);
  };

  onProgress = ({ percent }, file, data = {}) => {
    const uploadingFile = {
      name: data.filename || file.name,
      uid: data.uid || file.uid,
      percent: parseInt(percent, 10),
      status: "uploading"
    };
    this.onChange({ file: uploadingFile, fileList: this.state.fileList });
  };

  customRequest = ({ file, data }) => {
    // construct form-data for file upload
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append("upload", file);
    formData.append("filetype", this.getFileType(file));
    articlesRequest
      .uploadFile(formData, {
        onUploadProgress: ({ total, loaded }) => {
          this.onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file,
            data
          );
        }
      })
      .then(({ data: response }) => {
        this.onSuccess(response, file, data);
      })
      .catch(this.onError);
    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  };

  // Generate blob file from chipboard and upload manually
  pasteImage = event => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    Object.keys(items).forEach(index => {
      const item = items[index];
      if (item.kind === "file") {
        const blob = item.getAsFile();
        const uid = `screenshot-${Math.random()
          .toString(36)
          .substring(2, 12)}`;
        const filename = `${uid}.png`;
        // Manually upload image file
        this.customRequest({ file: blob, data: { filename, uid } });
        this.setState(prevState => ({
          fileList: prevState.fileList.concat({
            file: blob,
            filename,
            name: filename,
            uid
          })
        }));
      }
    });
  };

  getMarkdownText = file => {
    const filetype = this.getFileType(file);
    let fileComponent;
    if (filetype === "IMAGE") {
      fileComponent = `![${file.name}](${file.url})`;
    } else {
      fileComponent = `[${file.name}](${file.url})`;
    }
    return fileComponent;
  };

  getFileType = file => {
    if (
      file.name.endsWith("png") ||
      file.name.endsWith("jpg") ||
      file.name.endsWith("jpeg")
    ) {
      return "IMAGE";
    }
    return "ATTACHMENT";
  };

  onRemove = file => {
    articlesRequest
      .deleteFile(file.fileId)
      .then()
      .catch(this.onError);
    this.onChange({
      file: { ...file, status: "removed" },
      fileList: this.state.fileList
    });
  };

  // Copy file markdown syntax to user chipboard
  onCopy = file => {
    const str = this.getMarkdownText(file);
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    message.success(
      `${file.name} markdown syntax is copied to chipboard successfully`
    );
  };

  // Showing file dragging icon
  dragHandler = event => {
    event.dataTransfer.dropEffect = "copy";
  };

  componentDidMount = () => {
    document.addEventListener("dragover", evt => this.dragHandler(evt));
    document.addEventListener("paste", evt => this.pasteImage(evt));
  };

  componentWillUnmount = () => {
    document.removeEventListener("dragover", evt => this.dragHandler(evt));
    document.removeEventListener("paste", evt => this.pasteImage(evt));
  };

  render() {
    return (
      <div className="editor-dragger-wrapper">
        <DraggerInstance
          multiple={false}
          customRequest={this.customRequest}
          onChange={this.onChange}
          onRemove={this.onRemove}
          fileList={this.state.fileList}
          showUploadList={false}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            padding: "0px"
          }}
        >
          {this.props.children}
        </DraggerInstance>

        <DraggerInstance
          customRequest={this.customRequest}
          onChange={this.onChange}
          onRemove={this.onRemove}
          fileList={this.state.fileList}
          openFileDialogOnClick
        >
          <p className="editor-dropzone">
            Attach files by dragging & dropping, selecting or pasting them.
          </p>
        </DraggerInstance>

        <UploadedFileList
          fileList={this.state.fileList}
          onDelete={this.onRemove}
          onCopy={this.onCopy}
        />
      </div>
    );
  }
}

export default DraggerWrapper;
