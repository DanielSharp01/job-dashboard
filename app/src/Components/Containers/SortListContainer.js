import { connect } from 'react-redux'
import SortList from "../SortList/SortList";
import {
  addSortCriteria,
} from "../../Actions/sortCriteria"
import {
  addSortCriteriaSlot,
  changeSortCriteriaSlotAddText,
  changeSortCriteriaSlot,
  renameSortCriteriaSlotOnServer,
  removeSortCriteriaSlot,
  saveSortCriteriaSlot
} from "../../Actions/sortCriteriaSlots"
import { getSortCriteria } from '../../Reducers/sortCriteriaSlots';

const mapStateToProps = ({ sortCriteriaSlots }) => ({
  sortCriteria: getSortCriteria(sortCriteriaSlots),
  slots: sortCriteriaSlots.slots,
  selectedSlot: sortCriteriaSlots.selectedSlot,
  addText: sortCriteriaSlots.addText,
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addSortCriteria()),
  onAddTextChanged: (value) => dispatch(changeSortCriteriaSlotAddText(value)),
  onSlotAdded: () => dispatch(addSortCriteriaSlot()),
  onSlotChanged: (value) => dispatch(changeSortCriteriaSlot(value)),
  onSlotRenamed: () => dispatch(renameSortCriteriaSlotOnServer()),
  onSlotRemoved: () => dispatch(removeSortCriteriaSlot()),
  onSlotSaved: () => dispatch(saveSortCriteriaSlot()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortList);