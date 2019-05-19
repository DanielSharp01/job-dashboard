import * as Slots from "../../model/Slots";

export default (slotName) => {
  const Slot = Slots[slotName];
  return async (req, res, next) => {
    try {
      await Slot.deleteOne({ name: req.body.slot })
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
}