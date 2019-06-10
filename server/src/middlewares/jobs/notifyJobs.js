import Job from "../../model/Job";
import UserState from "../../model/UserState";
import moment from "moment";

export default async (req, res, next) => {
  if (!req.body.ids) return next(400); // TODO: Better error handling
  try {
    let userState = await UserState.findOrCreate({ userId: req.userId });
    userState.notificationTimestamp = moment();
    await userState.save();

    let promises = [];
    let jobStates = await Promise.all(req.body.ids.map(id => JobState.findOrCreate({ userId: req.userId, jobId: id })));
    for (let jobState of jobStates) {
      jobState.notify = true;
      promises.push(jobState.save());
    }
    await Promise.all(promises);
    return next();
  } catch (err) {
    return next(err);
  }
};
