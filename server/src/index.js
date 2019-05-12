import express from "express";
const app = express();
import requestSchonherz from "./middlewares/requestSchonherz";
import requestMuisz from "./middlewares/requestMuisz";
import parseSchonherz from "./middlewares/parseSchonherz";
import parseMuisz from "./middlewares/parseMuisz";
import requestDetails from "./middlewares/requestDetails";
import parseDetails from "./middlewares/parseDetails";
const port = 3100;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test',
  (req, res, next) => { res.requestHtml = {}; res.jobs = []; return next(); },
  requestSchonherz(),
  parseSchonherz(),
  requestMuisz(),
  parseMuisz(),
  requestDetails(),
  parseDetails(),
  (req, res, next) => { res.send(res.jobs) });

app.listen(port, () => console.log(`Listening on port ${port}!`));