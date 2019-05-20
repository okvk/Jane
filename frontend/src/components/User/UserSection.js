import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const UserSection = (props) => {
  if (props.isAuthenticated) {
    return (
      <Menu key="user" mode="horizontal" onClick={() => {}} style={{ lineHeight: '62px' }}>
        <SubMenu
          title={(
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
              Hi,
              </span>
              <span>{props.user.username}</span>
              <Avatar style={{ marginLeft: 8 }} src={props.avatar} />
            </Fragment>
          )}
        >
          <Menu.Item key="SignOut" onClick={props.onLogout}>Logout</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
  return (
    <Link to="/login" key="login">
        Login in
    </Link>
  );
};


const mapStateToProps = (state) => {
  const { user, isAuthenticated } = state.authentication;
  return { user, isAuthenticated };
};

export default withRouter(connect(mapStateToProps)(UserSection));
