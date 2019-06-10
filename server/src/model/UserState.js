import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const UserStateSchema = new Schema({
  userId: Schema.Types.ObjectId,
  notificationTimestamp: Date
});

UserStateSchema.statics.findOrCreate = async function({ userId }) {
  let res = await this.findOne({ userId });
  if (res) return res;
  res = new this();
  res._id = mongoose.Types.ObjectId();
  res.userId = userId;
  return res;
};

export default appConnection.model("UserState", UserStateSchema);
