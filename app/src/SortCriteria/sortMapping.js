export default {
  "Min pay": {
    type: "NUMBER",
    property: (job) => job.pay && job.pay.min,
    initialDirection: "Desc",
  },
  "Max pay": {
    type: "NUMBER",
    property: (job) => job.pay && job.pay.max,
    initialDirection: "Desc",
  },
  "Min hours": {
    type: "NUMBER",
    property: (job) => job.hours && job.hours.min,
    initialDirection: "Asc",
  },
  "Date": {
    type: "DATE",
    property: (job) => job.date,
    initialDirection: "Desc",
  },
}