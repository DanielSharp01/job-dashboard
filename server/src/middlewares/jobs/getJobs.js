import Job from "../../model/Job";
import JobState from "../../model/JobState";

export const renderJobObject = job => ({
  id: job._id,
  orgId: job.id,
  organization: job.organization,
  name: job.name,
  link: job.link,
  pay: job.pay,
  hours: job.hours,
  tags: job.tags,
  date: job.date,
  notify: job.notify,
  read: job.read
});

export default async (req, res, next) => {
  try {
    res.jobs = await Job.find({});
    let jobStates = (await JobState.find({ userId: req.userId })).reduce((acc, js) => {
      acc[js.jobId] = js;
      return acc;
    }, {});

    for (let i = 0; i < res.jobs.length; i++) {
      Object.assign(res.jobs[i], { notify: jobStates[res.jobs[i]._id] || false, read: jobStates[res.jobs[i]._id] || false });
    }
    res.jobs = res.jobs.map(renderJobObject);
    return next();
  } catch (err) {
    return next(err);
  }
};
