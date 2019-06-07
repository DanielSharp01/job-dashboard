import mongoose, { Schema } from "mongoose";

const SlotSchema = new Schema({
  name: { type: String, required: true, unique: true },
  content: Schema.Types.Mixed
});

export const FilterSlot = mongoose.model("FilterSlot", SlotSchema);
export const SortCriteriaSlot = mongoose.model("SortCriteriaSlot", SlotSchema);