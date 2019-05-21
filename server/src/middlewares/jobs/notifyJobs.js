import Job from "../../model/Job";
import Notification from "../../model/Notification";
import moment from "moment";

export default async (req, res, next) => {
  if (!req.body.ids) return next(400); // TODO: Better error handling
  try {
    let notification = await Notification.findOne({});
    if (!notificaiton) {
      notification = new Notification();
      notification.timestamp = moment();
      await notification.save();
    }
    else {
      notification.timestamp = moment();
      await notification.save();
    }

    let promises = [];
    let jobs = await Job.find({ _id: { $in: req.body.ids } });
    for (let job of jobs) {
      job.notify = true;
      promises.push(job.save());
    }
    await Promise.all(promises);
    return next();
  }
  catch (err) {
    return next(err);
  }
}