import express from "express";
import request from "./middlewares/request"
import parse from "./middlewares/parse";
import requestDetails from "./middlewares/requestDetails";
import parseDetails from "./middlewares/parseDetails";
import jobDiff from "./middlewares/jobDiff";
import saveJobs from "./middlewares/saveJobs";
import getJobs from "./middlewares/getJobs";
import every from "./timedRouter";
import cors from "cors";

const port = 3100;
const app = express();

app.use(cors());

app.get('/', (req, res) => res.redirect("/jobs"));

app.get('/jobs',
  getJobs,
  (req, res, next) => { res.send(res.jobs) });

app.listen(port, () => console.log(`Listening on port ${port}!`));

every({ name: "Schönherz", interval: 2, unit: "m", delay: 0 },
  (req, res, next) => { req.unroute(); req.organizations = [req.name], res.requestHtml = {}; res.jobs = []; return next(); },
  request,
  parse,
  jobDiff,
  requestDetails,
  parseDetails,
  saveJobs
);

every({ name: "Műisz", interval: 2, unit: "m", delay: 0 },
  (req, res, next) => { req.unroute(); req.organizations = [req.name], res.requestHtml = {}; res.jobs = []; return next(); },
  request,
  parse,
  jobDiff,
  requestDetails,
  parseDetails,
  saveJobs
);