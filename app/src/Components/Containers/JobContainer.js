import { connect } from 'react-redux'
import JobCards from "../JobCards/JobCards";
import moment from "moment";

function includesAny(haystack, needle) {
  return needle.length === 0 || haystack.filter(he => needle.filter(ne => he.toLowerCase().includes(ne.toLowerCase())).length > 0).length > 0;
}

function includesAll(haystack, needle) {
  return needle.filter(ne => haystack.filter(he => he.toLowerCase().includes(ne.toLowerCase())).length === 0).length === 0;
}

function includesNone(haystack, needle) {
  return haystack.filter(he => needle.filter(ne => he.toLowerCase().includes(ne.toLowerCase())).length > 0).length === 0;
}

function getFilterPredicate(filter) {
  let values;
  switch (filter.property) {
    case "Tags":
      values = filter.values.filter(v => v.checked).map(v => v.name);
      switch (filter.includeType) {
        case "all":
          return job => includesAll(job.tags, values);
        case "any":
          return job => includesAny(job.tags, values);
        case "none":
          return job => includesNone(job.tags, values);
        default:
          return job => false
      }
    case "Organization":
      values = filter.values.filter(v => v.checked).map(v => v.name);
      return job => values.includes(job.organization)
    case "Min pay":
      return job => job.pay && job.pay.min && job.pay.min >= filter.fromValue
    case "Min hours":
      return job => job.hours && job.hours.min && job.hours.min >= filter.fromValue && job.hours.min <= filter.toValue
    default:
      return job => false
  }
}

function getSortComparator(sortCriteria) {
  switch (sortCriteria.property) {
    case "Min pay":
      return (a, b) => (a.pay && a.pay.min ? a.pay.min : 0) - (b.pay && b.pay.min ? b.pay.min : 0);
    case "Max pay":
      return (a, b) => (a.pay && a.pay.max ? a.pay.max : a.pay && a.pay.min ? a.pay.min : 0)
        - (b.pay && b.pay.max ? b.pay.max : b.pay && b.pay.min ? b.pay.min : 0);
    case "Min hours":
      return (a, b) => (a.minHours ? a.minHours : 0) - (b.minHours ? b.minHours : 0)
    case "Date":
      return (a, b) => {
        a = moment(a.date);
        b = moment(b.date);
        return a.isBefore(b) ? -1 : a.isAfter(b) ? 1 : 0
      }
    default:
      return (a, b) => 0;
  }
}

function getSortComparatorWidthDir(sortCriteria) {
  return (a, b) => ((sortCriteria.direction === "Desc") ? -1 : 1) * (getSortComparator(sortCriteria))(a, b)
}

const filterJobs = (jobs, filters) => {
  if (filters.length === 0) return jobs;
  jobs = jobs.filter(getFilterPredicate(filters[0]));
  return filterJobs(jobs, filters.slice(1));
}

const sortJobs = (jobs, sortCriteria) => {
  if (sortCriteria.length === 0) return jobs;
  jobs = jobs.sort(getSortComparatorWidthDir(sortCriteria[sortCriteria.length - 1]));
  return sortJobs(jobs, sortCriteria.slice(0, -1));
}

const mapStateToProps = ({ jobs, filters, sortCriteria }) => ({
  jobs: sortJobs(filterJobs(Object.values(jobs), filters), sortCriteria)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobCards);