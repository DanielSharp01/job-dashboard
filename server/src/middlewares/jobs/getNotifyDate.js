import Notification from "../../model/Notification";
import moment from "moment";

export default async (req, res, next) => {
  try {
    let notification;
    let notifications = await Notification.find({});
    if (notifications.length === 0) {
      notification = new Notification();
      notification.timestamp = moment();
      await notification.save();
    }
    else notification = notifications[0];
    res.notifyDate = { timestamp: moment(notification.timestamp).format() };
    return next();
  }
  catch (err) {
    res.notifyDate = { timestamp: moment().format() };
    return next();
  }
}