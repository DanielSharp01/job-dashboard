import { connect } from 'react-redux'
import Filter from "../Filter/Filter";
import {
  changeFilterProperty,
  removeFilter,
  addListFilterValue,
  toggleListFilterValue,
  changeListFilterIncludeType,
  removeListFilterValue,
  changeRangeFilterValue,
  changeStringFilterValue,
  changeFilterStringMatchFlags
} from "../../Actions/filters"

import filterClassMap from "../../Filters/filterMapping";
import { getFilters } from '../../Reducers/filterSlots';

const mapStateToProps = ({ filterSlots }, { index }) => ({
  ...getFilters(filterSlots)[index],
  properties: Object.keys(filterClassMap),
});

const mapDispatchToProps = (dispatch, { index }) => ({
  changeProperty: (property) => dispatch(changeFilterProperty(index, property)),
  remove: () => dispatch(removeFilter(index)),
  onListAdd: (value) => dispatch(addListFilterValue(index, value)),
  onListChecked: (valueIndex) => dispatch(toggleListFilterValue(index, valueIndex)),
  changeIncludeType: (type) => dispatch(changeListFilterIncludeType(index, type)),
  onListRemove: (valueIndex) => dispatch(removeListFilterValue(index, valueIndex)),
  onRangeChange: ({ from, to }) => dispatch(changeRangeFilterValue(index, { from, to })),
  onStringChange: (value) => dispatch(changeStringFilterValue(index, value)),
  onMatchCaseChange: (value) => dispatch(changeFilterStringMatchFlags(index, { matchCase: value })),
  onWholeWordChange: (value) => dispatch(changeFilterStringMatchFlags(index, { wholeWord: value })),
  onRegexChange: (value) => dispatch(changeFilterStringMatchFlags(index, { regex: value }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);