import request from "../middlewares/request"
import parse from "../middlewares/parse";
import requestDetails from "../middlewares/requestDetails";
import parseDetails from "../middlewares/parseDetails";
import jobDiff from "../middlewares/jobDiff";
import saveJobs from "../middlewares/saveJobs";
import getJobs from "../middlewares/getJobs";
import sse from "../middlewares/sse";
import every from "../timedRouter";


export default (app) => {
  app.get('/jobs',
    getJobs,
    (req, res, next) => { res.send(res.jobs) });


  const sseClients = {};

  function sseSendAll({ id, event, data }) {
    for (let clientId of Object.keys(sseClients)) {
      sseClients[clientId].sendEvent({ id, event, data });
    }
  }

  app.get('/job-events', sse(sseClients));

  every({ name: "Schönherz", interval: 2, unit: "m", delay: 0 },
    (req, res, next) => { req.organizations = [req.name], res.requestHtml = {}; res.jobs = []; return next(); },
    request,
    parse,
    jobDiff(sseSendAll),
    requestDetails,
    parseDetails,
    saveJobs(sseSendAll)
  );

  every({ name: "Műisz", interval: 2, unit: "m", delay: 1 },
    (req, res, next) => { req.organizations = [req.name], res.requestHtml = {}; res.jobs = []; return next(); },
    request,
    parse,
    jobDiff(sseSendAll),
    requestDetails,
    parseDetails,
    saveJobs(sseSendAll)
  );
}