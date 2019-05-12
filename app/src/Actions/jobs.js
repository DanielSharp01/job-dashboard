import { ADD_JOB, RECIEVE_JOBS, REMOVE_JOB, MULTI_REMOVE_JOB } from "./index";

export function addJob(job) {
  return {
    type: ADD_JOB,
    job
  }
}

export function recieveJobs(jobs) {
  return {
    type: RECIEVE_JOBS,
    jobs
  }
}

export function removeJob(jobId) {
  return {
    type: REMOVE_JOB,
    jobId
  }
}

export function muliRemoveJob(jobIds) {
  return {
    type: MULTI_REMOVE_JOB,
    jobIds
  }
}

export const fetchJobs = () => {
  return async (dispatch) => {
    try {
      let res = await fetch("http://localhost:3100/jobs");
      let jobs = await res.json();
      console.log(jobs);
      dispatch(recieveJobs(jobs));
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}