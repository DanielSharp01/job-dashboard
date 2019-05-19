import { connect } from 'react-redux'
import JobCards from "../JobCards/JobCards";

import filterClassMap from "../../Filters/filterMapping";
import filterFuncMap from "../../Filters/filterFunctions";

import sortClassMap from "../../SortCriteria/sortMapping";
import sortFuncMap from "../../SortCriteria/sortFunctions"
import { getFilters } from '../../Reducers/filterSlots';
import { getSortCriteria } from '../../Reducers/sortCriteriaSlots';

import { markJobReadOnServer } from "../../Actions/jobs";

const filterJobs = (jobs, filters) => {
  if (filters.length === 0) return jobs;
  let filterClass = filterClassMap[filters[0].property];
  let filterFunc = filterFuncMap[filterClass.type];
  jobs = jobs.filter((job) => filterFunc(filterClass, job, filters[0]));
  return filterJobs(jobs, filters.slice(1));
}

const sortJobs = (jobs, sortCriteria) => {
  if (sortCriteria.length === 0) return jobs;
  let sortInst = sortCriteria[sortCriteria.length - 1];
  let sortClass = sortClassMap[sortInst.property];
  let sortFunc = sortFuncMap[sortClass.type];
  jobs = jobs.sort((a, b) => sortFunc(sortClass, a, b, sortInst));
  return sortJobs(jobs, sortCriteria.slice(0, -1));
}

const mapStateToProps = ({ jobs, filterSlots, sortCriteriaSlots }) => ({
  jobs: sortJobs(filterJobs(Object.values(jobs), getFilters(filterSlots) || []), getSortCriteria(sortCriteriaSlots) || [])
});

const mapDispatchToProps = dispatch => ({
  markAsRead: (id) => dispatch(markJobReadOnServer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobCards);