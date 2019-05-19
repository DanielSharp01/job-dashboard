import * as Slots from "../../model/Slots";

const renderSlot = (slot) => ({
  name: slot.name,
  content: slot.content
});


export default (slotName) => {
  const Slot = Slots[slotName];
  return async (req, res, next) => {
    try {
      res.slots = (await Slot.find({})).map(renderSlot);
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
}