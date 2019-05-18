export default (app) => {
  let sortCriteriaSlots = {};

  app.get('/sort-criteria-slots',
    (req, res, next) => { res.send(sortCriteriaSlots) });

  app.post('/sort-criteria-slots',
    (req, res, next) => { sortCriteriaSlots[req.body.slot] = req.body.sortCriteria; res.send() });

  app.delete('/sort-criteria-slots',
    (req, res, next) => { delete sortCriteriaSlots[req.body.slot]; res.send() });
}