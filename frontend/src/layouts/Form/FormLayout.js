import React from 'react';
import { Layout } from 'antd';

import styles from './FormLayout.module.scss';

const FormLayout = props => (
  <Layout.Content style={{ padding: '0 50px' }}>
    <div className={styles.form}>{props.children}</div>
  </Layout.Content>
);

export default FormLayout;
