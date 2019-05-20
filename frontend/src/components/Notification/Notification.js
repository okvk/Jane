import { notification } from 'antd';

// Notification type: 'success', 'info', 'warning', 'error'
const openNotification = (
  type = 'success',
  title = 'Notification Title',
  description = 'Notification Description',
) => {
  notification[type]({
    message: title,
    description,
  });
};

export default openNotification;
