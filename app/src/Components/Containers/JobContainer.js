import { connect } from 'react-redux'
import JobCards from "../JobCards/JobCards";

import { filterJobs } from "../../Filters/filterFunctions";
import { sortJobs } from "../../SortCriteria/sortFunctions"
import { getFilters } from '../../Reducers/filterSlots';
import { getSortCriteria } from '../../Reducers/sortCriteriaSlots';

import { markJobReadOnServer } from "../../Actions/jobs";

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