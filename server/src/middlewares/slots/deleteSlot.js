import * as Slots from "../../model/Slots";

export default slotName => {
  const Slot = Slots[slotName];
  return async (req, res, next) => {
    try {
      await Slot.deleteOne({ userId: req.userId, name: req.body.slot });
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
