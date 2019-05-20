import { POPUP_NOTIFICATION, POPUP_NOTIFICATION_EXPIRED } from "../Actions";

export default (state = [], action) => {
  switch (action.type) {
    case POPUP_NOTIFICATION:
      return [...state, action.job]
    case POPUP_NOTIFICATION_EXPIRED:
      return state.slice(1);
    default:
      return state;
  }
}