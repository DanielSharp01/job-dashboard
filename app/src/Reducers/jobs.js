import { RECIEVE_JOBS, REMOVE_JOBS, MARK_JOB_READ } from "../Actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_JOBS:
      return action.jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, { ...state });
    case REMOVE_JOBS:
      return action.jobIds.reduce((acc, id) => { delete acc[id]; return acc; }, { ...state });
    case MARK_JOB_READ:
      return Object.assign({ ...state }, { [action.jobId]: Object.assign({ ...state[action.jobId], }, { read: true }) });
    default:
      return state;
  }
}