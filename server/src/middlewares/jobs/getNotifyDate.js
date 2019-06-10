import UserState from "../../model/UserState";
import moment from "moment";

export default async (req, res, next) => {
  try {
    let userState = await UserState.findOrCreate({ userId: req.userId });
    userState.notificationTimestamp = moment();
    await userState.save();
    res.notifyDate = { timestamp: moment(userState.notificationTimestamp).format() };
    return next();
  } catch (err) {
    res.notifyDate = { timestamp: moment().format() };
    return next();
  }
};
