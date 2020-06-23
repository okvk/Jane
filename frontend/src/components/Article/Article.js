import React, { Component } from "react";
import { Modal, Icon, Tooltip } from "antd";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import { Tag } from "@/components";
import { deleteArticle } from "@/redux/actions/articleActions";
import "./Article.scss";

const { confirm } = Modal;

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
  }

  dateFormat = date => {
    const dateObj = new Date(Date.parse(date));
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-us", { month: "short" });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  showConfirm = (dispatch, articleId, username) => {
    confirm({
      title: "确定删除当前文章?",
      content: "文章删除操作不可撤销！",
      onOk() {
        dispatch(deleteArticle(articleId, username));
      },
      onCancel() {}
    });
  };

  toggleEditDeleteIcon = status => {
    this.setState({ visibility: status });
  };

  render() {
    const props = this.props;
    return (
      <div
        className="article-item"
        onMouseEnter={() => this.toggleEditDeleteIcon(true)}
        onMouseLeave={() => this.toggleEditDeleteIcon(false)}
      >
        <div className="article-title">
          <Link to={`/${props.username}/articles/${props.id}/`}>
            {props.title}
          </Link>
          {this.state.visibility ? (
            <div className="article-panel">
              <Tooltip title="编辑">
                <Link to={`/${props.username}/articles/${props.id}/edit`}>
                  <Icon type="edit" className="article-edit" />
                </Link>
              </Tooltip>
              <Tooltip title="删除">
                <Icon
                  type="delete"
                  className="article-delete"
                  onClick={() =>
                    this.showConfirm(props.dispatch, props.id, props.username)
                  }
                />
              </Tooltip>
            </div>
          ) : null}
        </div>
        <hr className="article-line" />
        <div className="article-summary">{props.summary}</div>
        <div className="article-meta">
          <div className="article-time">
            <Icon type="clock-circle" className="article-clock" />
            {this.dateFormat(props.ctime)}
          </div>
          <div className="article-tags">
            {props.tags.map(tag => (
              <Tag {...tag} key={tag.name} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { username } = state.authentication.user;
  return { username };
}

export default connect(mapStateToProps)(Article);
