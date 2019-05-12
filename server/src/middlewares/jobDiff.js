import Job from "../Job";

export default () => async (req, res, next) => {

  let promises = [];
  for (let organization of ["Müisz", "Schönherz"]) {
    if (res.requestHtml[organization]) {
      let jobs = res.jobs.filter(job => job.organization === organization);

      for (let job of jobs) {
        promises.push(Job.findOrCreate(job));
      }

      await Job.deleteMany({ id: { "$nin": jobs.map(job => job.id) }, organization });
    }
  }

  try {
    res.jobs = await Promise.all(promises);
  }
  catch (err) {
    return next(err);
  }
  return next();
};