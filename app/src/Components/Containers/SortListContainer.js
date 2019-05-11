import { connect } from 'react-redux'
import SortList from "../SortList/SortList";
import {
  addSortCriteria,
} from "../../Actions/sortCriteria"

const mapStateToProps = ({ sortCriteria }) => ({
  sortCriteria
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addSortCriteria())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortList);