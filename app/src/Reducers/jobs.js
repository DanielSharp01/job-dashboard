import { NEW_JOB, RECIEVE_JOBS } from "../Actions";

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_JOB:
      return { ...state, [action.job.id]: action.job }
    case RECIEVE_JOBS:
      return action.jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, {});
    default:
      return state;
  }
}