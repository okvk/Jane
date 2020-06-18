import { openNotification } from "@/components";
import TYPES from "@/redux/types/utilsTypes";

function showNotification(msg) {
  openNotification(msg.type, msg.title, msg.description);
  return {
    type: TYPES.SHOW_NOTIFICATION
  };
}

export default showNotification;
