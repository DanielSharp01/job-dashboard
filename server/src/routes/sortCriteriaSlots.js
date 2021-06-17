import getSlots from "../middlewares/slots/getSlots";
import saveSlot from "../middlewares/slots/saveSlot";
import deleteSlot from "../middlewares/slots/deleteSlot";

export default (app) => {
  app.get('/sort-criteria-slots', getSlots("SortCriteriaSlot"),
    (req, res, next) => { res.send(res.slots) });

  app.post('/sort-criteria-slots', saveSlot("SortCriteriaSlot"), (req, res, next) => res.status(200).send());

  app.delete('/sort-criteria-slots', deleteSlot("SortCriteriaSlot"), (req, res, next) => res.status(200).send());
}