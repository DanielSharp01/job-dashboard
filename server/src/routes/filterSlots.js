export default (app) => {

  let filterSlots = {};

  app.get('/filter-slots',
    (req, res, next) => { res.send(filterSlots) });

  app.post('/filter-slots',
    (req, res, next) => { filterSlots[req.body.slot] = req.body.filters; res.send() });

  app.delete('/filter-slots',
    (req, res, next) => { delete filterSlots[req.body.slot]; res.send() });
}