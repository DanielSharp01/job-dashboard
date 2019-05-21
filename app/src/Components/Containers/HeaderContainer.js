import { connect } from 'react-redux';
import Header from "../Header/Header";

import { markJobReadOnServer } from "../../Actions/jobs";
import { dateComparator } from "../../Reducers/jobs";

const mapStateToProps = ({ jobs, notifications }) => ({
  jobs: Object.values(jobs).filter(job => job.notify).sort(dateComparator),
  popupJob: notifications.popupStack[0]
});

const mapDispatchToProps = dispatch => ({
  markAsRead: (id) => dispatch(markJobReadOnServer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);