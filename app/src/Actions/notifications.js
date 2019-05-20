import { POPUP_NOTIFICATION, POPUP_NOTIFICATION_EXPIRED } from "./index";

export function popupNotification(job) {
  return {
    type: POPUP_NOTIFICATION,
    job
  }
}

export function popupNotificationExpired() {
  return {
    type: POPUP_NOTIFICATION_EXPIRED,
  }
}

export function popupNotificationThunk(job) {
  return (dispatch, getState) => {
    if (getState().notifications.length === 0) setTimeout(() => dispatch(popupNotificationExpiredThunk()), 10000);
    dispatch(popupNotification(job));
  }
}

export function popupNotificationExpiredThunk() {
  return (dispatch, getState) => {
    dispatch(popupNotificationExpired());
    if (getState().notifications.length > 0) {
      setTimeout(() => dispatch(popupNotificationExpiredThunk()), 10000);
    }
  }
}