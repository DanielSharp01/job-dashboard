import { connect } from 'react-redux'
import JobCards from "../JobCards/JobCards";

const filterJobs = (jobs, filters) => {
  // TODO
  jobs = Object.values(jobs);
  return jobs;
}

const sortJobs = (jobs, sortCriteria) => {
  // TODO
  return jobs;
}

const mapStateToProps = ({ jobs, filters, sortCriteria }) => ({
  jobs: sortJobs(filterJobs(jobs, filters), sortCriteria)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobCards);