import React from "react";
import { List, Progress, Icon } from "antd";

const UploadedFileList = props => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.fileList}
      renderItem={item => {
        if (item.status === "done") {
          return (
            <List.Item
              actions={[
                <a key="file-download" href={item.url}>
                  <Icon type="download" />
                </a>,
                <span key="file-copy" onClick={() => props.onCopy(item)}>
                  <Icon type="copy" />
                </span>,
                <span key="file-delete" onClick={() => props.onDelete(item)}>
                  <Icon type="delete" />
                </span>
              ]}
            >
              <List.Item.Meta
                title={
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Icon type="link" /> {item.name}
                  </a>
                }
              />
            </List.Item>
          );
        }
        return (
          <div className="editor-file-uploading">
            <span>Uploading file: {item.name}</span>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068"
              }}
              percent={item.percent}
            />
          </div>
        );
      }}
    />
  );
};

export default UploadedFileList;
