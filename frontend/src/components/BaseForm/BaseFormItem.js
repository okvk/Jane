import React from "react";
import { Form } from "antd";
import styles from "./BaseFormItem.module.scss";

const BaseFormItem = props => (
  <Form.Item>
    <div className={styles.brand}>JANE</div>
  </Form.Item>
);

export default BaseFormItem;
