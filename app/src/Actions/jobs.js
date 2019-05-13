import { RECIEVE_JOBS, REMOVE_JOBS } from "./index";

export function recieveJobs(jobs) {
  return {
    type: RECIEVE_JOBS,
    jobs
  }
}

export function removeJobs(jobIds) {
  return {
    type: REMOVE_JOBS,
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