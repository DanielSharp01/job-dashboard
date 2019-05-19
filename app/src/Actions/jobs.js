import { RECIEVE_JOBS, REMOVE_JOBS, MARK_JOB_READ } from "./index";

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

export function markJobRead(jobId) {
  return {
    type: MARK_JOB_READ,
    jobId
  }
}

export const fetchJobs = () => {
  return async (dispatch) => {
    try {
      let res = await fetch("http://localhost:3100/jobs");
      let jobs = await res.json();
      dispatch(recieveJobs(jobs));
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}


export function markJobReadOnServer(jobId) {
  return async (dispatch, getState) => {
    try {
      if (getState().jobs[jobId].read) return;
      dispatch(markJobRead(jobId)); // Pre dispatch
      await fetch("http://localhost:3100/jobs/mark-read", {
        method: "POST",
        body: JSON.stringify({ id: jobId }),
        headers: new Headers({ 'content-type': 'application/json' })
      });
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}