import React from 'react';
import {
  Form
} from 'antd';
import styles from "./BaseFormItem.module.scss";
import logo from "assets/logo.png";

const BaseFormItem = props => 
  <Form.Item>
    <div className={styles.logo_container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo Campfire" />
      </div>
      <div className={styles.brand}>
      JANE
      </div>
    </div>
  </Form.Item>

export default BaseFormItem;