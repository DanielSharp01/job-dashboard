import moment from "moment";

export default {
  "NUMBER": ascDescWrapper(sortNumber),
  "DATE": ascDescWrapper(sortDate)
}

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