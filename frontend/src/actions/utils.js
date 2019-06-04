import openNotification from "components/Notification/Notification";

import CS from "constants/utilsConstants";

function showNotification(msg) {
  openNotification(msg.type, msg.title, msg.description);
  return {
    type: CS.SHOW_NOTIFICATION
  };
}

export default showNotification;
