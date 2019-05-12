import mongoose, { Schema } from "mongoose";
import db from "./db";

const JobSchema = new Schema({
  id: { type: Number, required: true },
  organization: { type: String, required: true },
  name: String,
  link: String,
  pay: {
    min: Number,
    max: Number
  },
  hours: {
    min: Number,
    max: Number
  },
  tags: [String]
});

JobSchema.index({ id: 1, organization: 1 }, { unique: true });

JobSchema.statics.findOrCreate = async function ({ id, organization, name, link, pay }) {
  let res = await this.findOne({ id, organization });
  if (res) return res;

  res = new this();
  res._id = mongoose.Types.ObjectId();
  res.id = id;
  res.organization = organization;
  res.name = name;
  res.link = link;
  res.pay = pay;
  res.tags = null;
  return res;
}

export default mongoose.model("Job", JobSchema);