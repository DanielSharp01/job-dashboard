import { NEW_JOB, RECIEVE_JOBS } from "./index";

export function newJob(job) {
  return {
    type: NEW_JOB,
    job
  }
}

export function recieveJobs(jobs) {
  return {
    type: RECIEVE_JOBS,
    jobs
  }
}