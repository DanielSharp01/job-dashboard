import Job from "../Job";
import moment from "moment";

export default async (req, res, next) => {

  console.log(`Route ${req.name}`, `Diffing ${res.jobs.length} jobs.`);
  let promises = [];
  for (let organization of req.organizations) {
    if (res.requestHtml[organization]) {
      let jobs = res.jobs.filter(job => job.organization === organization);

      for (let job of jobs) {
        promises.push(Job.findOrCreate(job));
        if (job.date === undefined) job.date = moment("2019-05-13 18:00");
      }


      try {
        await Job.deleteMany({ id: { "$nin": jobs.map(job => job.id) }, organization });
      } catch (err) {
        console.error(`Route ${req.name}`, "Could not delete non-existing jobs.");
      }
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