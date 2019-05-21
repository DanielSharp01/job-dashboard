import { POPUP_NOTIFICATION, POPUP_NOTIFICATION_EXPIRED, NOTIFY_JOBS } from "../Actions";
import moment from "moment";

export default (state = { popupStack: [], timestamp: null }, action) => {
  switch (action.type) {
    case NOTIFY_JOBS:
      return Object.assign({ ...state }, { timestamp: moment().format() })
    case POPUP_NOTIFICATION:
      return Object.assign({ ...state }, { popupStack: [...state.popupStack, action.job] });
    case POPUP_NOTIFICATION_EXPIRED:
      return Object.assign({ ...state }, { popupStack: state.popupStack.slice(1) });
    default:
      return state;
  }
}