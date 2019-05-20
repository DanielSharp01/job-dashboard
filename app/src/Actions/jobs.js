import { RECIEVE_JOBS, REMOVE_JOBS, MARK_JOB_READ, NOTIFY_JOB } from "./index";

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
      dispatch(recieveJobs(jobs));
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

export function markJobRead(jobId) {
  return {
    type: MARK_JOB_READ,
    jobId
  }
}

export function markJobReadOnServer(jobId) {
  return async (dispatch, getState) => {
    try {
      if (getState().jobs[jobId].read) return;
      dispatch(markJobRead(jobId));
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

export function notifyJob(jobId) {
  return {
    type: NOTIFY_JOB,
    jobId
  }
}

export function notifyJobOnServer(jobId) {
  return async (dispatch) => {
    try {
      dispatch(notifyJob(jobId));
      await fetch("http://localhost:3100/jobs/notify", {
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