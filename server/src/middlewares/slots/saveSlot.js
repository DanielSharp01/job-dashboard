import * as Slots from "../../model/Slots";

export default slotName => {
  const Slot = Slots[slotName];
  return async (req, res, next) => {
    try {
      let slot = {
        userId: req.userId,
        name: req.body.slot,
        content: req.body.content
      };
      await Slot.replaceOne({ userId: req.userId, name: slot.name }, slot, { upsert: true });
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
