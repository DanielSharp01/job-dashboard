import { ADD_JOB, RECIEVE_JOBS, REMOVE_JOB, MULTI_REMOVE_JOB } from "../Actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_JOB:
      return { ...state, [action.job.id]: action.job }
    case RECIEVE_JOBS:
      return action.jobs.reduce((acc, job) => { acc[job.id] = job; return acc; }, { ...state });
    case REMOVE_JOB:
      return state.filter(job => job.id !== action.jobId);
    case MULTI_REMOVE_JOB:
      return state.filter(job => !action.jobIds.includes(job.id));
    default:
      return state;
  }
}