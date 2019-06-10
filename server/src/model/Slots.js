import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const SlotSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  content: Schema.Types.Mixed
});

export const FilterSlot = appConnection.model("FilterSlot", SlotSchema);
export const SortCriteriaSlot = appConnection.model("SortCriteriaSlot", SlotSchema);
