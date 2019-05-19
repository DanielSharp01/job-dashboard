import { renderJobObject } from "./getJobs";

export default (sseSendAll) => async (req, res, next) => {

  let modifiedJobs = res.jobs.filter(job => job.isModified());
  if (modifiedJobs.length > 0) sseSendAll({ event: "added-jobs", data: modifiedJobs.map(renderJobObject) });

  let promises = [];
  for (let job of modifiedJobs) {
    promises.push((async () => {
      try {
        return await job.save();
      }
      catch (err) {
        console.group(`Route ${req.name}`, `saving ${job.id} of ${job.organization} failed.`);
        console.error(err);
        console.groupEnd();
      }
    })());
  }

  console.log(`Route ${req.name}`, `saving ${modifiedJobs.length} jobs.`);
  await Promise.all(promises);
  return next();
};