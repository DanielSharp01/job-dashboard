import { connect } from 'react-redux'
import FilterList from "../FilterList/FilterList";
import {
  addFilter,
} from "../../Actions/filters"
import {
  addFilterSlot,
  changeFilterSlotAddText,
  changeFilterSlot,
  renameFilterSlot,
  removeFilterSlot,
  saveFilterSlot
} from "../../Actions/filterSlots"
import { getFilters } from '../../Reducers/filterSlots';

const mapStateToProps = ({ filterSlots }) => ({
  filters: getFilters(filterSlots),
  slots: filterSlots.slots,
  selectedSlot: filterSlots.selectedSlot,
  addText: filterSlots.addText,
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addFilter()),
  onAddTextChanged: (value) => dispatch(changeFilterSlotAddText(value)),
  onSlotAdded: () => dispatch(addFilterSlot()),
  onSlotChanged: (value) => dispatch(changeFilterSlot(value)),
  onSlotRenamed: () => dispatch(renameFilterSlot()),
  onSlotRemoved: () => dispatch(removeFilterSlot()),
  onSlotSaved: () => dispatch(saveFilterSlot()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);