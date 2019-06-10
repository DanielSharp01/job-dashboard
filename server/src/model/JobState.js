import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const JobStateSchema = new Schema({
  userId: Schema.Types.ObjectId,
  jobId: { type: Schema.Types.ObjectId },
  notify: Boolean,
  read: Boolean
});

JobStateSchema.statics.findOrCreate = async function({ userId, jobId }) {
  console.log("Find or create job state ", { userId, jobId });
  let res = await this.findOne({ userId, jobId });
  if (res) return res;
  res = new this();
  res._id = mongoose.Types.ObjectId();
  res.userId = userId;
  res.jobId = jobId;
  return res;
};

export default appConnection.model("JobState", JobStateSchema);
