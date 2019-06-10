import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const JobStateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  jobId: { type: Schema.Types.ObjectId, required: true },
  notify: Boolean,
  read: Boolean
});

JobStateSchema.index({ userId: 1, jobId: 1 }, { unique: true });

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
