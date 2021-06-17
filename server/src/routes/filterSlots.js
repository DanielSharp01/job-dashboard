import getSlots from "../middlewares/slots/getSlots";
import saveSlot from "../middlewares/slots/saveSlot";
import deleteSlot from "../middlewares/slots/deleteSlot";

export default (app) => {
  app.get('/filter-slots', getSlots("FilterSlot"),
    (req, res, next) => { res.send(res.slots) });

  app.post('/filter-slots', saveSlot("FilterSlot"), (req, res, next) => res.status(200).send());

  app.delete('/filter-slots', deleteSlot("FilterSlot"), (req, res, next) => res.status(200).send());
}