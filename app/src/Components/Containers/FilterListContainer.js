import { connect } from 'react-redux'
import FilterList from "../FilterList/FilterList";
import {
  addFilter,
} from "../../Actions/filters"

const mapStateToProps = ({ filters }) => ({
  filters
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addFilter())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);