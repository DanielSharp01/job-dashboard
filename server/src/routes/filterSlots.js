import getSlots from "../middlewares/slots/getSlots";
import saveSlot from "../middlewares/slots/saveSlot";
import deleteSlot from "../middlewares/slots/deleteSlot";

export default (app) => {
  app.get('/job-dashboard/filter-slots', getSlots("FilterSlot"),
    (req, res, next) => { res.send(res.slots) });

  app.post('/job-dashboard/filter-slots', saveSlot("FilterSlot"), (req, res, next) => res.status(200).send());

  app.delete('/job-dashboard/filter-slots', deleteSlot("FilterSlot"), (req, res, next) => res.status(200).send());
}