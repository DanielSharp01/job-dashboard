import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const UserStateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
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
