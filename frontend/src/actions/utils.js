import openNotification from 'components/Notification/Notification';

import {default as CS} from 'constants/utilsConstants';

export function showNotification(msg) {
  openNotification(msg.type, msg.title, msg.description)
  return {
    type: CS.SHOW_NOTIFICATION,
  };
}