import { connect } from 'react-redux'
import JobCards from "../JobCards/JobCards";

function includesAny(haystack, needle) {
  return haystack.filter(he => needle.filter(ne => he.includes(ne)).length > 0).length > 0;
}

function includesAll(haystack, needle) {
  return needle.length !== 0 && needle.filter(ne => haystack.filter(he => he.includes(ne)).length === 0).length === 0;
}

function includesNone(haystack, needle) {
  return haystack.filter(he => needle.filter(ne => he.includes(ne)).length > 0).length === 0;
}

function getFilterPredicate(filter) {
  let values;
  switch (filter.property) {
    case "Tags":
      values = filter.values.filter(v => v.checked).map(v => v.name);
      return job => includesAny(job.tags, values);
    case "Organization":
      values = filter.values.filter(v => v.checked).map(v => v.name);
      return job => values.includes(job.organization)
    case "Pay":
      return job => false
    case "Min hours":
      return job => false
  }
}

function getSortComparator(sortCriteria) {
  switch (sortCriteria.property) {
    case "Pay":
      return (a, b) => a.pay - b.pay;
    case "Min hours":
      return (a, b) => (a.minHours ? a.minHours : 0) - (b.minHours ? b.minHours : 0)
  }
}

function getSortComparatorWidthDir(sortCriteria) {
  return (a, b) => ((sortCriteria.direction === "Desc") ? -1 : 1) * (getSortComparator(sortCriteria))(a, b)
}

const filterJobs = (jobs, filters) => {
  if (filters.length == 0) return jobs;
  jobs = jobs.filter(getFilterPredicate(filters[0]));
  return filterJobs(jobs, filters.slice(1));
}

const sortJobs = (jobs, sortCriteria) => {
  if (sortCriteria.length == 0) return jobs;
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