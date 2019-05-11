import { connect } from 'react-redux'
import Filter from "../Filter/Filter";
import {
  changeFilterProperty,
  removeFilter,
  addListFilterValue,
  toggleListFilterValue,
  changeListFilterIncludeType,
  removeListFilterValue,
  changeRangeFilterValue
} from "../../Actions/filters"

import { properties } from "../../Reducers/filters";

const mapStateToProps = ({ filters }, { index }) => ({
  ...filters[index],
  properties,
});

const mapDispatchToProps = (dispatch, { index }) => ({
  changeProperty: (property) => dispatch(changeFilterProperty(index, property)),
  remove: () => dispatch(removeFilter(index)),
  onListAdd: (value) => dispatch(addListFilterValue(index, value)),
  onListChecked: (valueIndex) => dispatch(toggleListFilterValue(index, valueIndex)),
  changeIncludeType: (type) => dispatch(changeListFilterIncludeType(index, type)),
  onListRemove: (valueIndex) => dispatch(removeListFilterValue(index, valueIndex)),
  onRangeChange: ({ from, to }) => dispatch(changeRangeFilterValue(index, { from, to })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);