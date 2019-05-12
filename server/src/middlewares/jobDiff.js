import Job from "../Job";
import organizations from "../organizations";

export default () => async (req, res, next) => {

  console.log(`Diffing ${res.jobs.length} jobs.`);
  let promises = [];
  for (let organization of organizations) {
    if (res.requestHtml[organization]) {
      let jobs = res.jobs.filter(job => job.organization === organization);

      for (let job of jobs) {
        promises.push(Job.findOrCreate(job));
      }

      try {
        await Job.deleteMany({ id: { "$nin": jobs.map(job => job.id) }, organization });
      } catch (err) {
        console.error("Could not delete non-existing jobs.");
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