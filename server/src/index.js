import express from "express";
import request from "./middlewares/request"
import parse from "./middlewares/parse";
import requestDetails from "./middlewares/requestDetails";
import parseDetails from "./middlewares/parseDetails";
import jobDiff from "./middlewares/jobDiff";
import saveJobs from "./middlewares/saveJobs"

const port = 3100;
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test',
  (req, res, next) => { res.requestHtml = {}; res.jobs = []; return next(); },
  request(),
  parse(),
  jobDiff(),
  requestDetails(),
  parseDetails(),
  saveJobs(),
  (req, res, next) => { res.send(res.jobs) });

app.listen(port, () => console.log(`Listening on port ${port}!`));