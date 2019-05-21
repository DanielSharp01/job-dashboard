import moment from "moment";
import { RECIEVE_JOBS, REMOVE_JOBS, MARK_JOB_READ, NOTIFY_JOBS } from "../Actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_JOBS:
      return action.jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, { ...state });
    case REMOVE_JOBS:
      return action.jobIds.reduce((acc, id) => { delete acc[id]; return acc; }, { ...state });
    case MARK_JOB_READ:
      return Object.assign({ ...state }, { [action.jobId]: Object.assign({ ...state[action.jobId], }, { read: true }) });
    case NOTIFY_JOBS:
      return action.jobIds.reduce((acc, id) => {
        acc[id] = Object.assign({ ...state[id] }, { notify: true });
        return acc;
      }, { ...state });
    default:
      return state;
  }
}

export function dateComparator(a, b) {
  if (!a.date) return 1;
  if (!b.date) return -1;
  a = moment(a.date);
  b = moment(b.date);
  return a.isBefore(b) ? 1 : a.isAfter(b) ? -1 : 0;
}