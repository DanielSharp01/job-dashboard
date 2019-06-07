import Job from "../../model/Job";

export default (sseSendAll) => async (req, res, next) => {
  console.log(`Route ${req.name}`, `Diffing ${res.jobs.length} jobs.`);
  let allRemovedJobIds = [];
  let newResJobs = [];
  for (let organization of req.organizations) {
    if (res.requestHtml[organization]) {
      try {
        let dbJobs = await Job.find({ organization });
        dbJobs = dbJobs.reduce((acc, job) => {
          acc[job.id] = job;
          return acc;
        }, {});
        let jobs = res.jobs.filter(job => job.organization === organization);

        for (let job of jobs) {
          newResJobs.push(dbJobs[job.id] || Job.create(job));
        }

        try {
          let removedJobs = { ...dbJobs };

          for (let job of jobs) {
            delete removedJobs[job.id];
          }

          let removedJobIds = Object.keys(removedJobs);
          allRemovedJobIds = allRemovedJobIds.concat(removedJobIds.map(id => removedJobs[id]._id));

          console.log(`Route ${req.name}`, `removing ${removedJobIds.length} non-existing jobs`);
          await Job.deleteMany({ id: { "$in": removedJobIds }, organization });
        } catch (err) {
          console.error(`Route ${req.name}`, "error removing non-existing jobs.");
        }
      }
      catch (err) {
        return next(err);
      }
    }
  }

  if (allRemovedJobIds.length > 0) sseSendAll({ event: "removed-jobs", data: allRemovedJobIds });
  res.jobs = newResJobs;

  return next();
};