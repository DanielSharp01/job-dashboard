import moment from "moment";
import sortClassMap from "./sortMapping";

const sortFuncMap = {
  "NUMBER": ascDescWrapper(sortNumber),
  "DATE": ascDescWrapper(sortDate)
}
export default sortFuncMap;

function ascDescWrapper(sortFunc) {
  return (sortClass, a, b, sortCriteriaInst) =>
    ((sortCriteriaInst.direction === "Desc") ? -1 : 1) * sortFunc(sortClass, a, b)
}

function sortNumber(sortClass, a, b) {
  a = sortClass.property(a);
  b = sortClass.property(b);
  if (!a) return 1;
  if (!b) return -1;

  return a - b;
}

function sortDate(sortClass, a, b) {
  a = sortClass.property(a);
  b = sortClass.property(b);
  if (!a) return 1;
  if (!b) return -1;
  a = moment(a);
  b = moment(b);
  return a.isBefore(b) ? -1 : a.isAfter(b) ? 1 : 0;
}

export const sortJobs = (jobs, sortCriteria) => {
  if (sortCriteria.length === 0) return jobs;
  let sortInst = sortCriteria[sortCriteria.length - 1];
  let sortClass = sortClassMap[sortInst.property];
  let sortFunc = sortFuncMap[sortClass.type];
  jobs = jobs.sort((a, b) => sortFunc(sortClass, a, b, sortInst));
  return sortJobs(jobs, sortCriteria.slice(0, -1));
}