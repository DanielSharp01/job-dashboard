import mongoose, { Schema } from "mongoose";
import moment from "moment";

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
  tags: [String],
  date: Date,
  read: Boolean
});

JobSchema.index({ id: 1, organization: 1 }, { unique: true });

JobSchema.statics.create = function ({ id, organization, name, link, pay }) {
  let res = new this();
  res._id = mongoose.Types.ObjectId();
  res.id = id;
  res.organization = organization;
  res.name = name;
  res.link = link;
  res.pay = pay;
  res.tags = null;
  res.date = moment();
  return res;
}

export default mongoose.model("Job", JobSchema);