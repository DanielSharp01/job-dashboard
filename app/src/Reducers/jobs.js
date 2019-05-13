import { RECIEVE_JOBS, REMOVE_JOBS } from "../Actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_JOBS:
      return action.jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, { ...state });
    case REMOVE_JOBS:
      return action.jobIds.reduce((acc, id) => { delete acc[id]; return acc; }, { ...state });
    default:
      return state;
  }
}