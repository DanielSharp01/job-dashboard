import JobState from "../../model/JobState";

export default async (req, res, next) => {
  if (!req.body.id) return next(400); // TODO: Better error handling
  try {
    let jobState = await JobState.findOrCreate({ userId: req.userId, jobId: req.body.id });
    jobState.read = true;
    await jobState.save();
    return next();
  } catch (err) {
    return next(err);
  }
};
