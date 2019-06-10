import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const SlotSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  content: Schema.Types.Mixed
});

SlotSchema.index({ userId: 1, content: 1 }, { unique: true });

export const FilterSlot = appConnection.model("FilterSlot", SlotSchema);
export const SortCriteriaSlot = appConnection.model("SortCriteriaSlot", SlotSchema);
