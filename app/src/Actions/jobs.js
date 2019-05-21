import { RECIEVE_JOBS, REMOVE_JOBS, MARK_JOB_READ, NOTIFY_JOBS } from "./index";
import moment from "moment";
import { dateComparator } from "../Reducers/jobs";
import { popupNotificationThunk } from "./notifications";
import { getNotificationFilters } from "../Reducers/filterSlots";
import { filterJobs } from "../Filters/filterFunctions";

export function recieveJobs(jobs) {
  return {
    type: RECIEVE_JOBS,
    jobs
  }
}

export function recieveJobsThunk(jobs) {
  return async (dispatch, getState) => {
    let timestamp = getState().notifications.timestamp;
    if (!timestamp) {
      dispatch(notifyJob([]));
      try {
        let res = await fetch("http://localhost:3100/jobs/notify-date");
        timestamp = moment((await res.json()).timestamp);
      }
      catch (err) {
        console.error(err);
        timestamp = moment();
      }
    }
    else timestamp = moment(timestamp);

    dispatch(recieveJobs(jobs));
    let notifyJobs = jobs.filter(j => !j.notify && moment(j.date).isSameOrAfter(timestamp));
    notifyJobs = filterJobs(notifyJobs, getNotificationFilters(getState().filterSlots));
    dispatch(notifyJobsOnServer(notifyJobs.map(j => j.id)))
    for (let job of notifyJobs.filter(j => moment(j.date).add(15, "s").isAfter(moment())).sort(dateComparator)) {
      dispatch(popupNotificationThunk(job));
    }
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
      dispatch(recieveJobsThunk(jobs));
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

export function notifyJob(jobIds) {
  return {
    type: NOTIFY_JOBS,
    jobIds
  }
}

export function notifyJobsOnServer(jobIds) {
  return async (dispatch) => {
    if (jobIds.length === 0) return;
    try {
      dispatch(notifyJob(jobIds));
      await fetch("http://localhost:3100/jobs/notify", {
        method: "POST",
        body: JSON.stringify({ ids: jobIds }),
        headers: new Headers({ 'content-type': 'application/json' })
      });
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}