import { connect } from 'react-redux';
import moment from "moment";
import Header from "../Header/Header";

import { filterJobs } from "../../Filters/filterFunctions";
import { markJobReadOnServer } from "../../Actions/jobs";
import { getNotificationFilters } from "../../Reducers/filterSlots";
import { popupNotificationExpired } from "../../Actions/notifications";

function dateComparator(a, b) {
  if (!a.date) return 1;
  if (!b.date) return -1;
  a = moment(a.date);
  b = moment(b.date);
  return a.isBefore(b) ? 1 : a.isAfter(b) ? -1 : 0;
}

const mapStateToProps = ({ jobs, filterSlots, notifications }) => ({
  jobs: filterJobs(Object.values(jobs), getNotificationFilters(filterSlots)).filter(job => job.notify).sort(dateComparator),
  popupJob: notifications[0]
});

const mapDispatchToProps = dispatch => ({
  markAsRead: (id) => dispatch(markJobReadOnServer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);