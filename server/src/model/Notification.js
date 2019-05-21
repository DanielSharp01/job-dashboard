import mongoose, { Schema } from "mongoose";

const NotificationShema = new Schema({
  timestamp: { type: Date },
});

export default mongoose.model("Notification", NotificationShema);