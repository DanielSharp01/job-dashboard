import Job from "../../model/Job";

export default async (req, res, next) => {
  if (!req.body.id) return next(400); // TODO: Better error handling
  try {
    let job = await Job.findOne({ _id: req.body.id });
    job.read = true;
    await job.save();
    return next();
  }
  catch (err) {
    return next(err);
  }
}